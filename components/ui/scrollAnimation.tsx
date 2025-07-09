// Función específica para realizar animaciones de scroll a través de botones
export const scrollToTarget = (id: string) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
        // Calcula la posición de destino restando el offset deseado (20px)
        const offset = 72; // Define el offset en píxeles
        const targetPosition = targetElement.offsetTop - offset;

        window.scrollTo({
            // Usa la nueva posición calculada
            top: targetPosition,
            behavior: 'smooth'
        });
    }
};