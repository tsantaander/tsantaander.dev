// Scroll ultra-optimizado
export const scrollToTarget = (targetId: string): void => {
  const element = document.getElementById(targetId)
  if (!element) return

  // Usar scroll nativo optimizado
  window.scrollTo({
    top: element.offsetTop,
    behavior: "smooth",
  })
}