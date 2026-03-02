// Script principal para la funcionalidad de la página web

document.addEventListener('DOMContentLoaded', function() {
    // Inicialización de todas las funcionalidades
    initMobileMenu();
    initSmoothScroll();
    initFormHandling();
    initScrollEffects();
    initAdditionalInfoDetails();
    initAnimations();
    initTypewriterEffect();
    initParallaxEffects();
    initTooltip();
    initWaveEffects();
    initScrollReveal();
    initGreenGlow();
});

function isGreenZoneElement(el) {
    if (!el || el === document.body || el === document.documentElement) return false;
    if (el.classList && (el.classList.contains('gradient-bg') || el.classList.contains('bg-green-50'))) return true;
    if (el.className && typeof el.className === 'string') {
        if (el.className.includes('bg-green-')) return true;
        if (el.className.includes('from-green-')) return true;
        if (el.className.includes('to-green-')) return true;
    }
    return false;
}

function initAdditionalInfoDetails() {
    document.querySelectorAll('details.bg-green-50').forEach((details) => {
        const summary = details.querySelector('summary');
        const content = details.querySelector('div');
        if (!summary || !content) return;

        let isAnimating = false;
        let currentAnimation = null;

        function animate(open) {
            if (isAnimating) return;
            isAnimating = true;

            if (currentAnimation) {
                currentAnimation.cancel();
                currentAnimation = null;
            }

            if (open) {
                details.open = true;
            }

            const fullHeight = content.scrollHeight;
            const start = open ? 0 : fullHeight;
            const end = open ? fullHeight : 0;

            content.style.overflow = 'hidden';
            content.style.height = start + 'px';

            requestAnimationFrame(() => {
                currentAnimation = content.animate(
                    [{ height: start + 'px', opacity: open ? 0 : 1 }, { height: end + 'px', opacity: open ? 1 : 0 }],
                    { duration: 260, easing: 'ease-out', fill: 'forwards' }
                );

                currentAnimation.onfinish = () => {
                    if (!open) {
                        details.open = false;
                    }
                    content.style.height = '';
                    content.style.overflow = '';
                    currentAnimation = null;
                    isAnimating = false;
                };

                currentAnimation.oncancel = () => {
                    content.style.height = '';
                    content.style.overflow = '';
                    currentAnimation = null;
                    isAnimating = false;
                };
            });
        }

        summary.addEventListener('click', (e) => {
            e.preventDefault();
            animate(!details.open);
        });

        details.addEventListener('click', (e) => {
            if (e.target.closest('summary')) return;
            if (e.target.closest('a, button, input, textarea, select, label')) return;
            animate(!details.open);
        });
    });
}

// Menú móvil
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Scroll suave para navegación
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Ajuste para navegación fija
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Actualizar URL sin recargar
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Manejo de formularios
function initFormHandling() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validación básica
            if (!data.name || !data.email || !data.message) {
                showNotification('Por favor, completa todos los campos', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showNotification('Por favor, ingresa un email válido', 'error');
                return;
            }
            
            // Simular envío
            showLoading(this);
            
            setTimeout(() => {
                hideLoading(this);
                showNotification('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.', 'success');
                this.reset();
            }, 2000);
        });
    }
    
    // Newsletter
    const newsletterForm = document.querySelector('footer form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, ingresa un email válido', 'error');
                return;
            }
            
            showNotification('¡Gracias por suscribirte a nuestro newsletter!', 'success');
            this.reset();
        });
    }
}

// Efectos de scroll
function initScrollEffects() {
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Efecto en la navegación
        if (scrollTop > 100) {
            nav.classList.add('shadow-xl');
            nav.classList.add('bg-white/95', 'backdrop-blur-sm');
        } else {
            nav.classList.remove('shadow-xl');
            nav.classList.remove('bg-white/95', 'backdrop-blur-sm');
        }
        
        // Animar elementos al hacer scroll
        animateOnScroll();
    });
}

// Animaciones al hacer scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0) translateY(0)';
        }
    });
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300`;
    
    // Estilos según tipo
    const styles = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        info: 'bg-blue-500 text-white',
        warning: 'bg-yellow-500 text-white'
    };
    
    notification.classList.add(...styles[type].split(' '));
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${getNotificationIcon(type)} mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };
    return icons[type] || icons.info;
}

// Loading states
function showLoading(form) {
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...';
    button.disabled = true;
    button.dataset.originalText = originalText;
}

function hideLoading(form) {
    const button = form.querySelector('button[type="submit"]');
    button.innerHTML = button.dataset.originalText;
    button.disabled = false;
}

// Validación de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Animaciones adicionales
function initAnimations() {
    // Animar tarjetas de servicios
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
    
    // Animar estadísticas
    animateStats();
}

// Animación global al hacer scroll (desactivada)
function initScrollReveal() {
    // Función vacía - animaciones de aparición eliminadas
}

// Iluminación al pasar el ratón por zonas verdes (desactivada)
function initGreenGlow() {
    // Glow desactivado
}
// Animar contadores de estadísticas
function animateStats() {
    const stats = document.querySelectorAll('[data-stat]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.dataset.stat);
                const duration = 2000;
                const increment = finalValue / (duration / 16);
                let currentValue = 0;
                
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        currentValue = finalValue;
                        clearInterval(timer);
                    }
                    target.textContent = Math.floor(currentValue) + (target.dataset.suffix || '');
                }, 16);
                
                observer.unobserve(target);
            }
        });
    });
    
    stats.forEach(stat => observer.observe(stat));
}

// Efecto de partículas
function initParticles() {
    const heroSection = document.querySelector('.gradient-bg');
    if (!heroSection) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    heroSection.appendChild(particlesContainer);
    
    // Crear partículas
    for (let i = 0; i < 20; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    container.appendChild(particle);
}

// Efecto de máquina de escribir
function initTypewriterEffect() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid #667eea';
        
        let index = 0;
        const timer = setInterval(() => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(timer);
                // Efecto de parpadeo del cursor
                setInterval(() => {
                    element.style.borderColor = element.style.borderColor === 'transparent' ? '#667eea' : 'transparent';
                }, 500);
            }
        }, 100);
    });
}

// Efectos de parallax simple
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax-slow');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Sistema de tooltips
function initTooltip() {
    const tooltips = document.querySelectorAll('.tooltip');
    
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = this.dataset.tooltip;
            tooltip.style.cssText = `
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                background: #333;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                font-size: 0.875rem;
                white-space: nowrap;
                z-index: 1000;
                margin-bottom: 0.5rem;
            `;
            
            this.appendChild(tooltip);
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.custom-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Efectos de onda al hacer clic
function initWaveEffects() {
    const waveElements = document.querySelectorAll('.wave-effect');
    
    waveElements.forEach(element => {
        element.addEventListener('click', function(e) {
            const wave = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            wave.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                animation: wave 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(wave);
            
            setTimeout(() => {
                wave.remove();
            }, 600);
        });
    });
}

// Utilidades adicionales
const utils = {
    // Debounce function
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Detectar dispositivo móvil
    isMobile: function() {
        return window.innerWidth <= 768;
    },
    
    // Obtener año actual
    getCurrentYear: function() {
        return new Date().getFullYear();
    }
};

// Aplicar throttle a eventos de scroll
window.addEventListener('scroll', utils.throttle(animateOnScroll, 100));

// Exportar utilidades para uso global
window.utils = utils;

// Preloader simple
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// Manejo de errores globales
window.addEventListener('error', function(e) {
    console.error('Error detectado:', e.error);
    showNotification('Ha ocurrido un error inesperado', 'error');
});

// Service Worker simple para PWA (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('Service Worker registrado:', registration);
            })
            .catch(function(error) {
                console.log('Error al registrar Service Worker:', error);
            });
    });
}
