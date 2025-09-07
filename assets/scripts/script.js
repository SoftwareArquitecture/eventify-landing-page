document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const hamburgerIcon = document.querySelector('.hamburguer-icon');
    const navLinks = document.querySelector('nav ul');
    const navLinksItems = document.querySelectorAll('nav ul li a');

    // Crear el menú móvil
    function createMobileMenu() {
        // Crear el elemento del menú móvil
        const mobileMenu = document.createElement('ul');
        mobileMenu.className = 'mobile-menu';

        // Clonar los elementos de navegación
        navLinksItems.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.href;
            a.textContent = item.textContent;

            // Añadir evento de clic para cerrar el menú al navegar
            a.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
            });

            li.appendChild(a);
            mobileMenu.appendChild(li);
        });

        // Añadir el menú móvil al body
        document.body.appendChild(mobileMenu);

        return mobileMenu;
    }

    const mobileMenu = createMobileMenu();

    // Toggle del menú hamburguesa
    hamburgerIcon.addEventListener('click', function(e) {
        e.preventDefault();
        mobileMenu.classList.toggle('active');
    });

    // Cerrar el menú móvil al hacer clic fuera de él
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.hamburguer-icon') && !e.target.closest('.mobile-menu')) {
            mobileMenu.classList.remove('active');
        }
    });
    // Smooth scroll para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animación para planes al hacer hover
    const planCards = document.querySelectorAll('.plan-card');

    planCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Animación para los botones de Call to Action
    const ctaButtons = document.querySelectorAll('.btn-action, .plan-card-btn');

    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'all 0.3s ease';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Añadir efecto de scroll para cambiar el color de la navegación
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');

        if (window.scrollY > 100) {
            nav.style.backgroundColor = '#1C2541';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
            nav.style.transition = 'all 0.3s ease';
        } else {
            nav.style.backgroundColor = '#3A506B';
            nav.style.boxShadow = 'none';
        }
    });

    // Añadir efecto resaltar para el elemento de navegación activo según la sección visible
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = '#6FFFE9';
                link.style.fontWeight = '600';
            } else {
                link.style.color = '';
                link.style.fontWeight = '';
            }
        });

        // También actualizar el menú móvil
        document.querySelectorAll('.mobile-menu li a').forEach(link => {
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = '#6FFFE9';
                link.style.fontWeight = '600';
            } else {
                link.style.color = '';
                link.style.fontWeight = '';
            }
        });
    });

    // Añadir un efecto de carga al inicio de la página
    function addPageLoader() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <img src="/eventify-landing-page/assets/images/eventify-logo.png" alt="Eventify Logo" />
                <div class="loader-spinner"></div>
            </div>
        `;

        document.body.appendChild(loader);

        // Añadir los estilos para el loader
        const loaderStyle = document.createElement('style');
        loaderStyle.textContent = `
            .page-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #1C2541;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                transition: opacity 0.5s ease;
            }
            
            .loader-content {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .loader-content img {
                max-width: 200px;
                margin-bottom: 20px;
            }
            
            .loader-spinner {
                width: 50px;
                height: 50px;
                border: 5px solid rgba(111, 255, 233, 0.3);
                border-radius: 50%;
                border-top-color: #6FFFE9;
                animation: spin 1s ease-in-out infinite;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(loaderStyle);

        // Ocultar el loader después de que la página cargue
        window.addEventListener('load', function() {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }

    // Ejecutar la función para añadir el loader
    addPageLoader();

    // Añadir efecto de animación para elementos al hacer scroll
    function addScrollAnimations() {
        const elementsToAnimate = [
            ...document.querySelectorAll('h2'),
            ...document.querySelectorAll('.benefits-card'),
            ...document.querySelectorAll('.function-card'),
            ...document.querySelectorAll('.plan-card'),
            ...document.querySelectorAll('.profile-item'),
            ...document.querySelectorAll('.startup-profile')
        ];

        // Añadir clase inicial para los elementos
        elementsToAnimate.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        // Función para verificar si un elemento está en el viewport
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
            );
        }

        // Función para animar elementos visibles
        function animateElementsOnScroll() {
            elementsToAnimate.forEach(element => {
                if (isElementInViewport(element)) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }

        // Ejecutar la animación cuando se hace scroll
        window.addEventListener('scroll', animateElementsOnScroll);

        // Ejecutar la animación al cargar la página
        setTimeout(animateElementsOnScroll, 100);
    }

    // Ejecutar función para añadir animaciones al scroll
    addScrollAnimations();

    // Añadir funcionalidad para los iconos de redes sociales
    const socialIcons = document.querySelectorAll('.footer-social-networks i');

    socialIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Aquí se puede añadir links a redes sociales reales cuando estén disponibles
            const socialLinks = {
                'fa-x-twitter': 'https://twitter.com',
                'fa-instagram': 'https://instagram.com',
                'fa-youtube': 'https://youtube.com',
                'fa-github': 'https://github.com'
            };

            for (const socialClass in socialLinks) {
                if (this.classList.contains(socialClass)) {
                    window.open(socialLinks[socialClass], '_blank');
                    break;
                }
            }
        });
    });

    // Detectar idioma actual por el nombre del archivo
    const path = window.location.pathname;
    const isSpanish = !path.includes('index.html');

    const btnES = document.getElementById('btn-es');
    const btnEN = document.getElementById('btn-en');

    if (isSpanish) {
        btnES.classList.add('active');
        btnEN.classList.remove('active');
    } else {
        btnEN.classList.add('active');
        btnES.classList.remove('active');
    }

    btnES.addEventListener('click', () => {
        if (!isSpanish) {
            window.location.href = 'index-es.html';
        }
    });

    btnEN.addEventListener('click', () => {
        if (isSpanish) {
            window.location.href = 'index.html';
        }
    });

});