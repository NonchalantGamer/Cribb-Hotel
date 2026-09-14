/**
 * Smooth scrolling utility with sticky header offset calculation
 */
export const smoothScrollTo = (target: string, offset: number = 80): void => {
  if (!target || target === '#' || target === '#top') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    return;
  }

  const id = target.startsWith('#') ? target.slice(1) : target;
  const element = document.getElementById(id);

  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};
