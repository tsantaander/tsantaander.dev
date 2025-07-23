// Scroll ultra-optimizado
export const scrollToTarget = (targetId: string): void => {
  const element = document.getElementById(targetId)
  if (!element) return

  const headerOffset = 100
  const elementPosition = element.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset

  // Usar scroll nativo optimizado
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  })
}