// Inicializar iconos
lucide.createIcons();

// Manejo del menú móvil
const btn = document.getElementById('mobile-menu-button');
const menu = document.getElementById('mobile-menu');

if (btn && menu) {
    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    // Cerrar menú móvil al hacer click en un enlace
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
    });
}

// Efecto visual de Navbar y Botón Volver Arriba al hacer scroll
const navbar = document.getElementById('navbar');
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

if (navbar && scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        // Navbar
        if (window.scrollY > 10) {
            navbar.classList.add('shadow-sm');
        } else {
            navbar.classList.remove('shadow-sm');
        }

        // Scroll to Top Button
        if (window.scrollY > 400) {
            scrollToTopBtn.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
            scrollToTopBtn.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
        } else {
            scrollToTopBtn.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
            scrollToTopBtn.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
        }
    });
}

// Envío de alerta al recibir una visita (correo a amoretty010292@gmail.com)
(function() {
    try {
        var formData = new FormData();
        formData.append('_subject', 'Nueva visita al sitio - Dklar Estudio');
        formData.append('_captcha', 'false');
        formData.append('Tipo', 'Visita al sitio web');
        formData.append('Fecha', new Date().toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'medium' }));
        formData.append('URL', window.location.href);
        formData.append('User-Agent', navigator.userAgent);
        fetch('https://formsubmit.co/ajax/amoretty010292@gmail.com', {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        }).catch(function() {});
    } catch (e) {
        // Silenciar errores para no afectar la navegación
    }
})();

// Formulario de contacto con reCAPTCHA (FormSubmit): envío normal + redirección de vuelta
(function() {
    var contactForm = document.getElementById('contactForm');
    var nextInput = document.getElementById('formNextUrl');
    if (nextInput) {
        var base = window.location.origin + window.location.pathname;
        nextInput.value = base + (base.indexOf('?') !== -1 ? '&' : '?') + 'enviado=1';
    }
    // Mostrar mensaje de éxito si volvemos desde FormSubmit
    if (window.location.search.indexOf('enviado=1') !== -1) {
        var successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.classList.remove('hidden');
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            setTimeout(function() {
                successMessage.classList.add('hidden');
            }, 8000);
            history.replaceState(null, '', window.location.origin + window.location.pathname);
        }
    }
})();

// Lógica del Slider Hero
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('opacity-100', 'z-10');
        slide.classList.add('opacity-0', 'z-0');
        if (dots[i]) {
            dots[i].classList.remove('bg-accent-500');
            dots[i].classList.add('bg-white/50');
        }
    });

    if (slides[index]) {
        slides[index].classList.remove('opacity-0', 'z-0');
        slides[index].classList.add('opacity-100', 'z-10');
    }
    if (dots[index]) {
        dots[index].classList.remove('bg-white/50');
        dots[index].classList.add('bg-accent-500');
    }
    currentSlide = index;
}

function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
}

function prevSlide() {
    let prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
}

if (slides.length > 0) {
    const nextBtn = document.getElementById('next-slide');
    const prevBtn = document.getElementById('prev-slide');

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetInterval();
        });
    });

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    slideInterval = setInterval(nextSlide, 5000);
}

