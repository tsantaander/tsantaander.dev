// Optimized scroll animation with better performance
export const scrollToTarget = (targetId: string): void => {
  const element = document.getElementById(targetId)
  if (!element) return

  // Use native smooth scroll optimized for Lenis
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

/**
 * Enhanced scroll function with optional offset
 * @param targetId - Element ID to scroll to
 * @param offsetPx - Additional offset in pixels (e.g., for fixed headers)
 */
export const scrollToTargetWithOffset = (targetId: string, offsetPx = 0): void => {
  const element = document.getElementById(targetId)
  if (!element) return

  const targetPosition = element.getBoundingClientRect().top + window.scrollY - offsetPx

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  })
}