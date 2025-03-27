/**
 * Utility to animate elements when they come into view
 * This can be used with Intersection Observer to animate elements on scroll
 */
export const initScrollAnimations = (): void => {
  // Only run in the browser environment
  if (typeof window === 'undefined') return;
  
  const observerOptions = {
    root: null, // Use the viewport as the root
    rootMargin: '0px', // No margin
    threshold: 0.1 // Trigger when 10% of the element is visible
  };
  
  const handleIntersection = (entries: IntersectionObserverEntry[]): void => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  };
  
  const observer = new IntersectionObserver(handleIntersection, observerOptions);
  
  // Observe all elements with the animate-on-scroll class
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(element => {
    observer.observe(element);
  });
};

/**
 * Apply staggered animation to children elements
 * @param selector - CSS selector for parent element
 * @param childSelector - CSS selector for children to animate
 * @param baseDelay - Base delay in milliseconds
 * @param increment - Increment between each child in milliseconds
 */
export const applyStaggeredAnimation = (
  selector: string,
  childSelector: string,
  baseDelay = 0,
  increment = 50
): void => {
  // Only run in the browser environment
  if (typeof window === 'undefined') return;
  
  const container = document.querySelector(selector);
  if (!container) return;
  
  const children = container.querySelectorAll(childSelector);
  
  children.forEach((child, index) => {
    const delay = baseDelay + (index * increment);
    (child as HTMLElement).style.animationDelay = `${delay}ms`;
  });
};

/**
 * Creates a smooth scroll effect to an element
 * @param elementId - The ID of the element to scroll to
 * @param offset - Offset from the top in pixels
 * @param duration - Duration of the scroll animation in milliseconds
 */
export const scrollToElement = (
  elementId: string,
  offset = 0,
  duration = 500
): void => {
  // Only run in the browser environment
  if (typeof window === 'undefined') return;
  
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

/**
 * Applies a typing animation effect to text
 * @param element - The element to animate
 * @param text - The text to type
 * @param speed - Typing speed in milliseconds per character
 */
export const typeText = (
  element: HTMLElement,
  text: string,
  speed = 50
): Promise<void> => {
  return new Promise(resolve => {
    let i = 0;
    element.textContent = '';
    
    const typing = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typing);
        resolve();
      }
    }, speed);
  });
};
