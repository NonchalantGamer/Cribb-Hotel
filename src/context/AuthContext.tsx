import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
  sendResetPassword: (email: string) => Promise<void>;
  logOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  addRewardPoints: (points: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch or initialize user profile in Firestore
  const syncUserProfile = async (firebaseUser: User) => {
    try {
      const userRef = doc(db, 'users', firebaseUser.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        setProfile(snap.data() as UserProfile);
      } else {
        // Generate initial welcome membership card
        const initialProfile: UserProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || (firebaseUser.email ? firebaseUser.email.split('@')[0] : 'Guest Member'),
          photoURL: firebaseUser.photoURL || null,
          membershipNumber: `CRB-${Math.floor(100000 + Math.random() * 900000)}`,
          tier: 'Member',
          rewardPoints: 2500, // Complimentary welcome bonus points
          memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        };

        try {
          await setDoc(userRef, initialProfile);
        } catch (writeErr) {
          console.warn('Could not write profile to Firestore, using client state:', writeErr);
        }
        setProfile(initialProfile);
      }
    } catch (err) {
      console.warn('Error syncing user profile:', err);
      // Fallback local profile if Firestore read fails
      setProfile({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || (firebaseUser.email ? firebaseUser.email.split('@')[0] : 'Guest Member'),
        photoURL: firebaseUser.photoURL || null,
        membershipNumber: `CRB-${Math.floor(100000 + Math.random() * 900000)}`,
        tier: 'Member',
        rewardPoints: 2500,
        memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await syncUserProfile(currentUser);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const result = await signInWithPopup(auth, provider);
    if (result.user) {
      await syncUserProfile(result.user);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
    if (cred.user) {
      await syncUserProfile(cred.user);
    }
  };

  const signUpWithEmail = async (email: string, password: string, displayName: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
    if (cred.user) {
      if (displayName.trim()) {
        try {
          await updateProfile(cred.user, { displayName: displayName.trim() });
        } catch (e) {
          console.warn('Could not update profile display name:', e);
        }
      }
      await syncUserProfile(cred.user);
    }
  };

  const sendResetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email.trim());
  };

  const logOut = async () => {
    await signOut(auth);
    setProfile(null);
  };

  const refreshProfile = async () => {
    if (auth.currentUser) {
      await syncUserProfile(auth.currentUser);
    }
  };

  const addRewardPoints = async (points: number) => {
    if (!user || !profile) return;
    const currentPoints = profile.rewardPoints ?? 2500;
    const newTotal = currentPoints + points;
    const updatedProfile: UserProfile = { ...profile, rewardPoints: newTotal };
    setProfile(updatedProfile);

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { rewardPoints: newTotal });
    } catch (err) {
      console.warn('Could not update reward points in Firestore, state updated locally:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        sendResetPassword,
        logOut,
        refreshProfile,
        addRewardPoints
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
