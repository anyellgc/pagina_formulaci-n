document.addEventListener('DOMContentLoaded', () => {

    // --- ARCHIVO CORE: ENRUTADOR SPA CON CONTROL DE ANIMACIÓN INTERNA ---
    const navLinks = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.tab-section');
    const logoInicio = document.getElementById('logo-inicio');

    function switchTab(targetId) {
        // 1. Alternar clases del Navbar
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-target') === targetId) {
                link.classList.add('active');
            }
        });

        // 2. Ocultar y mostrar secciones con reinicio de animación
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.getAttribute('id') === targetId) {
                section.classList.add('active');
                // Disparar la animación de entrada de los bloques internos de la sección seleccionada
                triggerInternalAnimations(section);
            }
        });

        // 3. Reset del scroll de pantalla inmediato
        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    // Automatización de carga progresiva para bloques internos (.anim-block)
    function triggerInternalAnimations(activeSection) {
        const blocks = activeSection.querySelectorAll('.anim-block');
        blocks.forEach((block, index) => {
            // Estilos de preparación inicial
            block.style.opacity = "0";
            block.style.transform = "translateY(20px)";
            block.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
            
            // Retraso escalonado (Stagger effect) para una entrada sumamente fluida
            setTimeout(() => {
                block.classList.add('reveal-visible');
            }, index * 100); 
        });
    }

    // Escuchadores de clics en navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            switchTab(targetId);
        });
    });

    if (logoInicio) {
        logoInicio.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab('inicio');
        });
    }

    // Inyección global de ruteo para botones internos
    window.navegarA = function(targetId) {
        switchTab(targetId);
    };

    // Ejecutar animación inicial para la sección de inicio al cargar la página por primera vez
    const initialSection = document.querySelector('.tab-section.active');
    if (initialSection) {
        triggerInternalAnimations(initialSection);
    }

    console.log("%c CyberFlux Labs Engine V2 - Animaciones fluidas y grids adaptadas aplicadas con éxito.", "color: #f43f5e; font-weight: bold;");
});