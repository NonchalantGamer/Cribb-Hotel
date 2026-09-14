import { KnowledgeChunk, HOTEL_META } from './types';
import { hotelKnowledge } from './hotel';
import { roomsKnowledge } from './rooms';
import { policiesKnowledge } from './policies';
import { servicesKnowledge } from './services';
import { supportKnowledge } from './support';
import { emergencyKnowledge } from './emergency';

export * from './types';
export { hotelKnowledge } from './hotel';
export { roomsKnowledge } from './rooms';
export { policiesKnowledge } from './policies';
export { servicesKnowledge } from './services';
export { supportKnowledge } from './support';
export { emergencyKnowledge } from './emergency';

export const ALL_KNOWLEDGE_BASE: KnowledgeChunk[] = [
  ...hotelKnowledge,
  ...roomsKnowledge,
  ...policiesKnowledge,
  ...servicesKnowledge,
  ...supportKnowledge,
  ...emergencyKnowledge,
];

export function getKnowledgeCategories(): string[] {
  return Array.from(new Set(ALL_KNOWLEDGE_BASE.map(k => k.category)));
}

export function getKnowledgeChunkById(id: string): KnowledgeChunk | undefined {
  return ALL_KNOWLEDGE_BASE.find(k => k.id === id);
}

export function getHotelMeta() {
  return HOTEL_META;
}
