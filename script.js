// Script principal para la funcionalidad de la página web
console.log('🔧 SCRIPT.JS CARGADO - Inicio del archivo');

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOMContentLoaded activado - Página cargada');
    // Inicialización de todas las funcionalidades
    initMobileMenu();
    initSmoothScroll();
    initFormHandling();
    initScrollEffects();
    initAnimations();
    
    // Cargar PDFs automáticamente desde Google Apps Script
    console.log('🚀 Iniciando carga de transparencia...');
    loadTransparenciaFromAppsScript();
    
    initTypewriterEffect();
    initParallaxEffects();
    initTooltip();
    initWaveEffects();
    initScrollReveal();
    initGreenGlow();
    updateCurrentYear();
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
            
            // Saltar si el href es solo "#" (inválido)
            if (targetId === '#') {
                return;
            }
            
            const target = document.querySelector(targetId);
            
            if (target) {
                // Ajuste diferente para "Nosotros" para mostrar más contenido
                let offsetAdjust = 80;
                if (targetId === '#nosotros') {
                    offsetAdjust = 150; // Más abajo para la sección Nosotros
                }
                const offsetTop = target.offsetTop - offsetAdjust;
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
                showNotification('Per favor, completa tots els camps', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showNotification('Per favor, introdueix un email vàlid', 'error');
                return;
            }
            
            // Simular envío
            showLoading(this);
            
            setTimeout(() => {
                hideLoading(this);
                showNotification('¡Missatge enviat amb èxit! Ens posarem en contacte prompte.', 'success');
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
                showNotification('Per favor, introdueix un email vàlid', 'error');
                return;
            }
            
            showNotification('¡Gràcies per subscriure\'t al nostre butlletí!', 'success');
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

// Sistema de notificaciones mejorado
function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle', warning: 'fa-exclamation-triangle' };
    notification.innerHTML = `<i class="fas ${icons[type] || icons.info} mr-2"></i>${message}`;
    document.body.appendChild(notification);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => notification.classList.add('show'));
    });

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 400);
    }, 4000);
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

// Scroll Reveal – anima elementos con clase .reveal, .reveal-left, .reveal-right
function initScrollReveal() {
    const revealClasses = ['.reveal', '.reveal-left', '.reveal-right'];
    const elements = document.querySelectorAll(revealClasses.join(','));
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
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

// Manejo de errores globales (desactivado)
// window.addEventListener('error', function(e) {
//     console.error('Error detectado:', e.error);
//     // showNotification('Ha ocurrido un error inesperado', 'error'); // Desactivado
// });

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

// Función para mostrar subapartados de transparencia
function showTransparenciaSubapartado(subapartado) {
    console.log('showTransparenciaSubapartado llamado con:', subapartado);
    
    // Ocultar todos los contenidos
    const contents = document.querySelectorAll('.transparencia-content');
    console.log('Encontrados', contents.length, 'elementos transparencia-content');
    contents.forEach(content => {
        content.classList.add('hidden');
        console.log('Ocultado:', content.id);
    });
    
    // Remover clase active de todos los botones
    const buttons = document.querySelectorAll('.transparencia-btn');
    console.log('Encontrados', buttons.length, 'elementos transparencia-btn');
    buttons.forEach(button => {
        button.classList.remove('active', 'bg-green-600', 'text-white');
        button.classList.add('bg-white', 'text-gray-800', 'shadow-lg');
    });
    
    // Mostrar el contenido seleccionado
    const selectedContent = document.getElementById(subapartado + '-content');
    console.log('Elemento de contenido seleccionado:', selectedContent);
    console.log('ID del elemento:', subapartado + '-content');
    
    if (selectedContent) {
        selectedContent.classList.remove('hidden');
        console.log('Clase hidden eliminada de:', selectedContent.id);
    } else {
        console.error('Elemento de contenido no encontrado:', subapartado + '-content');
    }
    
    // Activar el botón seleccionado
    const selectedButton = document.querySelector(`[onclick="showTransparenciaSubapartado('${subapartado}')"]`);
    console.log('Botón seleccionado:', selectedButton);
    
    if (selectedButton) {
        selectedButton.classList.add('active', 'bg-green-600', 'text-white');
        selectedButton.classList.remove('bg-white', 'text-gray-800', 'shadow-lg', 'hover:bg-green-100');
        selectedButton.classList.add('hover:bg-green-700');
        console.log('Botón activado para:', subapartado);
    } else {
        console.error('Botón no encontrado para:', subapartado);
    }
}

// CONFIGURACIÓN DE MÚLTIPLES CARPETAS DE GOOGLE DRIVE
// Define les carpetes i les seues categories

const DRIVE_FOLDERS = {
    'memorias': '107i4-PA1dslnQaTTF69KemwA5V5cJxTn',      // Carpeta de memorias ✅
    'balance': '1UBLR4lCn8poDQIo7k2jGm2jcWmxh_DmD',      // Carpeta de balance ✅
    'subvenciones': '16wSaFGdFYv6UkrncvXIDxkfQBD4pAsED', // Nueva carpeta de subvenciones ✅
    'menus': '1IEOdQ3KlBtdnNs-XkYCySoHxSUTtu2F2' // Nueva carpeta para menús mensuales ✅
};

// URL del Apps Script con código original completo
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw0U0Fo2I1k18SGjwy65daOz35W5hE5bTl-xkmwJdTa2Ry1ydEh9MUNVDtIFmnOcsEcRw/exec';

// Función para cargar datos desde múltiples carpetas de Google Apps Script
async function loadTransparenciaFromAppsScript() {
    console.log(' loadTransparenciaFromAppsScript: Iniciando carga de datos...');

    try {
        // Cargar cada sección individualmente (más fiable que la función combinada)
        const [memorias, balance, subvenciones] = await Promise.all([
            loadIndividualFolder('memorias'),
            loadIndividualFolder('balance'),
            loadIndividualFolder('subvenciones')
        ]);

        // Mostrar memorias
        console.log('Array de memorias:', memorias);
        console.log('Longitud de memorias:', memorias ? memorias.length : 'indefinido/nulo');
        console.log('Tipo de memorias:', typeof memorias);
        
        if (memorias && memorias.length > 0) {
            console.log(' Mostrando memorias:', memorias.length);
            displayMemoriasFromAppsScript(memorias);
        } else {
            console.warn(' No hi ha memòries disponibles');
        }

        // Mostrar balance
        if (balance && balance.length > 0) {
            console.log(' Mostrando balance:', balance.length);
            displayBalanceFromAppsScript(balance);
        } else {
            console.warn(' No hi ha balanç disponible');
        }

        // Mostrar subvenciones
        if (subvenciones && subvenciones.length > 0) {
            console.log(' Mostrando subvenciones:', subvenciones.length);
            displaySubvencionesFromAppsScript(subvenciones);
        } else {
            console.warn(' No hi ha subvencions disponibles');
        }

        console.log(' Carga de transparencia completada');

    } catch (error) {
        console.error(' Error en loadTransparenciaFromAppsScript:', error);
    }
}
async function loadIndividualFolder(category) {
    const folderId = DRIVE_FOLDERS[category];
    if (!folderId) {
        console.warn(` No se encontró ID para ${category}`);
        return [];
    }

    try {
        const url = `${APPS_SCRIPT_URL}?folder=${folderId}&category=${category}`;
        console.log(` Cargando ${category} desde: ${url}`);

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success && data.files) {
            console.log(` ${category}: ${data.files.length} archivos cargados`);
            return data.files;
        } else {
            console.warn(` ${category}: Respuesta sin archivos - ${data.error || 'Desconocido'}`);
            return [];
        }
    } catch (error) {
        console.error(` Error cargando ${category}:`, error);
        return [];
    }
}

// Función para mostrar Memorias desde Apps Script
function displayMemoriasFromAppsScript(memorias) {
    console.log('displayMemoriasFromAppsScript llamado con:', memorias);
    
    // Selector para el grid layout
    const container = document.querySelector('#memorias-content .grid');
    
    console.log('Contenedor encontrado:', container);
    console.log('HTML del contenedor:', container ? container.outerHTML.substring(0, 100) + '...' : 'nulo');
    
    if (!container) {
        console.error('Contenedor #memorias-content .grid no encontrado');
        return;
    }

    // Ordenar per any descendent i agafar els 3 més recents
    const sortedMemorias = memorias
        .filter(m => m.year) // Solo las que tienen año
        .sort((a, b) => b.year - a.year)
        .slice(0, 3);
    
    console.log('Memorias ordenadas:', sortedMemorias);

    if (sortedMemorias.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-8 text-gray-500">
                <i class="fas fa-file-alt text-4xl mb-4"></i>
                <p>No hi ha memòries disponibles</p>
            </div>
        `;
        return;
    }

    const html = sortedMemorias.map((memoria, index) => {
        console.log('Procesando memoria:', memoria);
        console.log('Tiempo de modificación de memoria:', memoria.modifiedTime);
        console.log('Tiempo de creación de memoria:', memoria.createdTime);
        console.log('Fecha de memoria:', memoria.date);
        console.log('Todas las claves de memoria:', Object.keys(memoria));
        
        // Todos los documentos de memorias usan el mismo color ámbar
        const color = { bg: 'bg-amber-100', text: 'text-amber-600', border: 'border-amber-600' };
        
        // Extraer año del nombre del archivo o usar año de los metadatos
        let year = memoria.year || '';
        if (!year && memoria.name) {
            const yearMatch = memoria.name.match(/\b(19|20)\d{2}\b/);
            year = yearMatch ? yearMatch[0] : '';
        }
        
        const dateStr = memoria.modifiedTime || memoria.dateUpdated ? 
            new Date(memoria.modifiedTime || memoria.dateUpdated).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }) : 
            memoria.createdTime || memoria.dateCreated ? 
            new Date(memoria.createdTime || memoria.dateCreated).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }) : 
            memoria.date ? 
            new Date(memoria.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }) : 
            'Sense data';

        return `
            <div class="bg-white border-l-4 ${color.border} rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex items-center mb-4">
                    <div class="${color.bg} p-3 rounded-full mr-4">
                        <i class="fas fa-book ${color.text} text-xl"></i>
                    </div>
                    <div>
                        <h5 class="font-semibold text-gray-800">${memoria.title || memoria.name || 'Document sense títol'}</h5>
                        <p class="text-sm text-gray-600">Publicat: ${dateStr}</p>
                    </div>
                </div>
                <a href="${memoria.webViewLink || memoria.url || '#'}" 
                   target="_blank"
                   class="inline-flex items-center ${color.text} hover:${color.text.replace('600', '700')} font-medium bg-amber-100 px-4 py-2 rounded-lg hover:scale-105 hover:shadow-lg active:scale-95 active:rotate-3 transition-all duration-300 ease-in-out">
                    <i class="fas fa-eye mr-2 transition-transform duration-300 hover:rotate-12"></i>
                    Vore document
                </a>
            </div>
        `;
    }).join('');
    
    console.log('HTML generado:', html);
    container.innerHTML = html;
    console.log('HTML insertado en contenedor');
    
    // Mostrar alerta de éxito
    if (sortedMemorias.length > 0) {
        console.log('✅ ¡Documentos de memoria cargados exitosamente!');
        console.log(`📄 Se encontraron ${sortedMemorias.length} documento(s) de memoria`);
    }
}

// Función para mostrar Balance desde Apps Script
function displayBalanceFromAppsScript(balance) {
    console.log('displayBalanceFromAppsScript called with:', balance);
    
    // Selector para el grid layout
    const container = document.querySelector('#balance-content .grid');
    console.log('Balance container found:', container);
    
    if (!container) {
        console.error('Container #balance-content .grid not found');
        return;
    }

    if (balance.length === 0) {
        console.log('No hi ha balanç, mostrant missatge buit');
        container.innerHTML = `
            <div class="col-span-full text-center py-8">
                <i class="fas fa-info-circle text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-500">No hi ha documents de balanç disponibles en este moment</p>
            </div>
        `;
        return;
    }

    console.log('Mostrando', balance.length, 'balance');
    const html = balance.map((item, index) => {
        // Todos los documentos de balance usan el mismo color azul
        const color = { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-600' };

        const dateStr = item.modifiedTime || item.dateUpdated ? 
            new Date(item.modifiedTime || item.dateUpdated).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }) : 
            item.createdTime || item.dateCreated ? 
                new Date(item.createdTime || item.dateCreated).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }) : 
                item.date ? 
                    new Date(item.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    }) : 
                    'Sense data';

        return `
            <div class="bg-white border-l-4 ${color.border} rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex items-center mb-4">
                    <div class="${color.bg} p-3 rounded-full mr-4">
                        <i class="fas fa-calculator ${color.text} text-xl"></i>
                    </div>
                    <div>
                        <h5 class="font-semibold text-gray-800">${item.title || 'Document sense títol'}</h5>
                        <p class="text-sm text-gray-600">Publicat: ${dateStr}</p>
                    </div>
                </div>
                <a href="${item.webViewLink || item.url || '#'}" 
                   target="_blank"
                   class="inline-flex items-center ${color.text} hover:${color.text.replace('600', '700')} font-medium bg-blue-100 px-4 py-2 rounded-lg hover:scale-105 hover:shadow-lg active:scale-95 active:rotate-3 transition-all duration-300 ease-in-out">
                    <i class="fas fa-eye mr-2 transition-transform duration-300 hover:rotate-12"></i>
                    Vore document
                </a>
            </div>
        `;
    }).join('');
    
    console.log('Generated HTML:', html);
    container.innerHTML = html;
}

// Función para mostrar Subvenciones desde Apps Script
function displaySubvencionesFromAppsScript(subvenciones) {
    console.log('displaySubvencionesFromAppsScript called with:', subvenciones);
    
    // Selector para el grid layout
    const container = document.querySelector('#subvenciones-content .grid');
    console.log('Subvenciones container found:', container);
    
    if (!container) {
        console.error('Container #subvenciones-content .grid not found');
        return;
    }

    if (subvenciones.length === 0) {
        console.log('No hi ha subvencions, mostrant missatge buit');
        container.innerHTML = `
            <div class="col-span-full text-center py-8">
                <i class="fas fa-info-circle text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-500">No hi ha documents de subvencions disponibles en este moment</p>
            </div>
        `;
        return;
    }

    console.log('Mostrando', subvenciones.length, 'subvenciones');
    const html = subvenciones.map((item, index) => {
        // Todos los documentos de subvenciones usan el mismo color púrpura
        const color = { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-600' };

        const dateStr = item.modifiedTime || item.dateUpdated ? 
            new Date(item.modifiedTime || item.dateUpdated).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }) : 
            item.createdTime || item.dateCreated ? 
                new Date(item.createdTime || item.dateCreated).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }) : 
                item.date ? 
                    new Date(item.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    }) : 
                    'Sense data';

        return `
            <div class="bg-white border-l-4 ${color.border} rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex items-center mb-4">
                    <div class="${color.bg} p-3 rounded-full mr-4">
                        <i class="fas fa-hand-holding-usd ${color.text} text-xl"></i>
                    </div>
                    <div>
                        <h5 class="font-semibold text-gray-800">${item.title || 'Document sense títol'}</h5>
                        <p class="text-sm text-gray-600">Publicat: ${dateStr}</p>
                    </div>
                </div>
                <a href="${item.webViewLink || item.url || '#'}" 
                   target="_blank"
                   class="inline-flex items-center ${color.text} hover:${color.text.replace('600', '700')} font-medium bg-purple-100 px-4 py-2 rounded-lg hover:scale-105 hover:shadow-lg active:scale-95 active:rotate-3 transition-all duration-300 ease-in-out">
                    <i class="fas fa-eye mr-2 transition-transform duration-300 hover:rotate-12"></i>
                    Vore document
                </a>
            </div>
        `;
    }).join('');
    
    console.log('Generated HTML:', html);
    console.log('About to set innerHTML on container:', container);
    console.log('Container before insertion:', container.innerHTML);
    
    container.innerHTML = html;
    
    console.log('Container after insertion:', container.innerHTML);
    console.log('✅ HTML inserted successfully');
}

// Función para parsear CSV
function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    const data = [];
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
        const row = {};
        
        headers.forEach((header, index) => {
            row[header] = values[index] || '';
        });
        
        data.push(row);
    }
    
    return data;
}

// Función para mostrar Memorias desde Drive (solo las 3 más recientes)
function displayMemoriasFromDrive(files) {
    const container = document.querySelector('#memorias-content .grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
    
    if (!container) return;
    
    // Filtrar i ordenar per any (del nom de l'arxiu)
    const sortedFiles = files
        .map(file => {
            const yearMatch = file.name.match(/(\d{4})/);
            const year = yearMatch ? parseInt(yearMatch[1]) : 0;
            return { ...file, year };
        })
        .sort((a, b) => b.year - a.year) // Más reciente primero
        .slice(0, 3); // Solo 3 más recientes
    
    if (sortedFiles.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-8">
                <i class="fas fa-info-circle text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-500">No hi ha documents de memòria disponibles en este moment</p>
            </div>
        `;
        return;
    }
    
    const html = sortedFiles.map((file, index) => {
        const colors = [
            { bg: 'bg-green-100', text: 'text-green-600' },
            { bg: 'bg-blue-100', text: 'text-blue-600' },
            { bg: 'bg-purple-100', text: 'text-purple-600' }
        ];
        const color = colors[index % colors.length];
        
        // Generar título automático basado en el nombre del archivo
        let titulo = file.name;
        if (titulo.match(/^\d{4}/)) {
            titulo = `Memòria any ${file.year}`;
        } else if (titulo.toLowerCase().includes('memoria')) {
            titulo = titulo.replace(/\.pdf$/i, '');
        }
        
        return `
            <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex items-center mb-4">
                    <div class="${color.bg} p-3 rounded-full mr-4">
                        <i class="fas fa-file-pdf ${color.text} text-xl"></i>
                    </div>
                    <div>
                        <h5 class="font-semibold text-gray-800">${titulo}</h5>
                        <p class="text-sm text-gray-600">Publicat: ${new Date(file.modifiedTime).toLocaleDateString('ca-ES')}</p>
                    </div>
                </div>
                <p class="text-sm text-gray-600 mb-4">
                    Document de memòria anual ${file.year ? `de l'exercici ${file.year}` : ''}
                </p>
                <a href="${file.webViewLink || file.webContentLink || '#'}" 
                   target="_blank"
                   class="inline-flex items-center ${color.text} hover:${color.text.replace('600', '700')} font-medium">
                    <i class="fas fa-eye mr-2"></i>
                    Vore document
                </a>
            </div>
        `;
    }).join('');
    
    container.innerHTML = html;
}

// Función para mostrar Balance desde Drive
function displayBalanceFromDrive(files) {
    const container = document.querySelector('#balance-content .space-y-4');
    
    if (!container) return;
    
    if (files.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-info-circle text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-500">No hi ha documents de balanç disponibles en este moment</p>
            </div>
        `;
        return;
    }
    
    const html = files.map(file => `
        <div class="border-l-4 border-blue-600 pl-4">
            <h5 class="font-semibold text-gray-800">${file.name.replace(/\.pdf$/i, '')}</h5>
            <p class="text-gray-600 text-sm mb-2">Document de balanç econòmic i financer</p>
            <a href="${file.webViewLink || file.webContentLink || '#'}" 
               target="_blank"
               class="text-blue-600 hover:text-blue-700 font-medium">Descarregar Document</a>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

// Función para mostrar Subvenciones desde Drive
function displaySubvencionesFromDrive(files) {
    const container = document.querySelector('#subvenciones-content .space-y-4');
    
    if (!container) return;
    
    if (files.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-info-circle text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-500">No hi ha documents de subvencions disponibles en este moment</p>
            </div>
        `;
        return;
    }
    
    const html = files.map(file => `
        <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
            <h5 class="font-semibold text-gray-800">${file.name.replace(/\.pdf$/i, '')}</h5>
            <p class="text-lg font-bold text-green-600">Vore document</p>
            <p class="text-sm text-gray-600">Informació sobre subvenció o ajuda pública</p>
            <a href="${file.webViewLink || file.webContentLink || '#'}" 
               target="_blank"
               class="text-green-600 hover:text-green-700 font-medium mt-2 inline-block">Descarregar PDF</a>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

// Función para mostrar error en caso de fallo de carga
function showTransparenciaError() {
    const containers = ['memorias-content', 'balance-content', 'subvenciones-content'];
    
    containers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (container) {
            const contentArea = container.querySelector('.grid, .space-y-4');
            if (contentArea) {
                contentArea.innerHTML = `
                    <div class="col-span-full text-center py-8">
                        <i class="fas fa-exclamation-triangle text-4xl text-yellow-500 mb-4"></i>
                        <p class="text-gray-500">Error al carregar els documents. Intenta-ho més tard.</p>
                    </div>
                `;
            }
        }
    });
}

// VERSIÓN DE DEPURACIÓN - Probar Apps Script directamente
async function testAppsScript() {
    try {
        console.log('Probando Apps Script...');
        const response = await fetch(APPS_SCRIPT_URL);

        if (!response.ok) {
            console.error('Error HTTP:', response.status, response.statusText);
            return;
        }

        const data = await response.json();
        console.log('Datos recibidos del Apps Script:', data);

        // Mostrar información de archivos encontrados
        console.log('Memorias encontradas:', data.memorias?.length || 0);
        console.log('Balance encontrados:', data.balance?.length || 0);
        console.log('Subvenciones encontradas:', data.subvenciones?.length || 0);

        // Mostrar detalles de cada categoría
        if (data.memorias && data.memorias.length > 0) {
            console.log('Detalles de memorias:', data.memorias);
        }

    } catch (error) {
        console.error('Error probando Apps Script:', error);
    }
}

// Inicializar carga de datos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Cargar PDFs automáticamente desde Google Apps Script
    loadTransparenciaFromAppsScript();
    
    // Inicializar navegación de transparencia
    showTransparenciaSubapartado('memorias');
    
    // Actualizar botón del menú mensual
    updateMenuMensualButton();
});

// Función para generar enlace de visualización segura
function getSafeViewUrl(url) {
    if (!url || url === '#') return '#';
    
    // Extraer el ID del archivo de Google Drive
    const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (match && match[1]) {
        const fileId = match[1];
        return `https://drive.google.com/file/d/${fileId}/view`;
    }
    
    // Si no es un enlace de Drive, devolver el original
    return url;
}
function updateMenuMensualButton() {
    // Buscar todos los botones de menú mensual
    const menuButtons = document.querySelectorAll('button[onclick*="abrirMenuMensual"]');
    
    menuButtons.forEach(button => {
        button.innerHTML = `<i class="fas fa-utensils mr-2"></i>El nostre Menú`;
    });
}

// Función para abrir el menú mensual
async function abrirMenuMensual() {
    const meses = ['gener', 'febrer', 'març', 'abril', 'maig', 'juny', 'juliol', 'agost', 'setembre', 'octubre', 'novembre', 'desembre'];
    const fechaActual = new Date();
    const mesActual = meses[fechaActual.getMonth()];
    const añoActual = fechaActual.getFullYear();
    
    // Mostrar modal de carga
    const modalContent = `
        <div id="menuMensualModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div class="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="text-2xl font-bold text-gray-800">
                        <i class="fas fa-utensils text-green-600 mr-3"></i>
                        Nostre Menú ${mesActual.charAt(0).toUpperCase() + mesActual.slice(1)} ${añoActual}
                    </h3>
                    <button onclick="cerrarMenuMensual()" class="text-gray-500 hover:text-gray-700 hover:scale-110 active:scale-95 text-2xl w-8 h-8 rounded-full bg-white hover:bg-gray-100 active:bg-gray-200 transition-all duration-300 ease-in-out flex items-center justify-center shadow-md hover:shadow-lg active:shadow-sm">
                        <i class="fas fa-times transition-transform duration-300"></i>
                    </button>
                </div>
                
                <div id="menuContent" class="text-center py-8">
                    <div class="inline-flex items-center">
                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mr-3"></div>
                        <span class="text-gray-600">Carregant menú mensual...</span>
                    </div>
                </div>
                
                <div class="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 class="font-semibold text-gray-700 mb-2">
                        <i class="fas fa-info-circle text-green-600 mr-2"></i>
                        Informació Nutricional
                    </h4>
                    <p class="text-sm text-gray-600">
                        Tots els nostres menús estan dissenyats per nutricionistes especialitzats en geriatria, 
                        adaptant-se a les necessitats dietètiques específiques de cada persona.
                    </p>
                </div>
            </div>
        </div>
    `;
    
    // Añadir el modal al body
    document.body.insertAdjacentHTML('beforeend', modalContent);
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
    
    // Cargar los menús desde Google Drive usando la misma lógica que transparencia
    try {
        console.log('🍽 Cargando menú mensual desde Google Drive...');
        console.log('📁 Carpeta de menús:', DRIVE_FOLDERS.menus);
        
        // Obtener los archivos de la carpeta de menús (misma lógica que transparencia)
        const response = await fetch(`${APPS_SCRIPT_URL}?folder=${DRIVE_FOLDERS.menus}&category=menus`);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('✅ Menús cargados:', data);
        
        // Verificar si la respuesta fue exitosa
        if (!data.success) {
            throw new Error(`Error del servidor: ${data.error}`);
        }
        
        // El script unificado devuelve {success: true, files: [...]}
        const files = data.files || data;
        
        // Mostrar los menús en el modal
        displayMenuFromDrive(files);
        
    } catch (error) {
        console.error('❌ Error cargando menú mensual:', error);
        console.error('❌ Detalles del error:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        
        // Mostrar mensaje de error con más detalles
        const menuContent = document.getElementById('menuContent');
        if (menuContent) {
            menuContent.innerHTML = `
                <div class="text-center py-8">
                    <i class="fas fa-exclamation-triangle text-4xl text-yellow-500 mb-4"></i>
                    <p class="text-gray-500 mb-4">Error al carregar el menú mensual</p>
                    <p class="text-sm text-gray-400 mb-2">Error: ${error.message}</p>
                    <p class="text-xs text-gray-500">Revisa la consola per a més detalls</p>
                    <button onclick="cerrarMenuMensual()" class="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition">
                        Tancar
                    </button>
                </div>
            `;
        }
    }
}

// Función para mostrar los menús desde Drive (con detección automática del mes)
function displayMenuFromDrive(files) {
    const menuContent = document.getElementById('menuContent');
    if (!menuContent) return;
    
    if (files.length === 0) {
        menuContent.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-info-circle text-4xl text-gray-400 mb-4"></i>
                <p class="text-gray-500">No hi ha menús disponibles per a este mes</p>
            </div>
        `;
        return;
    }
    
    // Ordenar archivos por fecha de modificación (el más reciente primero)
    files.sort((a, b) => {
        const dateA = new Date(a.dateUpdated || a.dateCreated);
        const dateB = new Date(b.dateUpdated || b.dateCreated);
        return dateB - dateA; // Más reciente primero
    });
    
    // Tomar solo el archivo más reciente
    const latestFile = files[0];
    
    // Obtenir el mes i any actual automàticament
    const meses = ['gener', 'febrer', 'març', 'abril', 'maig', 'juny', 'juliol', 'agost', 'setembre', 'octubre', 'novembre', 'desembre'];
    const fechaActual = new Date();
    const mesActual = meses[fechaActual.getMonth()];
    const añoActual = fechaActual.getFullYear();
    
    // Extraer nombre limpio del archivo
    const cleanName = latestFile.name
        .replace(/\.[^/.]+$/, '') // Quitar extensión
        .replace(/[-_]/g, ' ') // Reemplazar guiones y guiones bajos con espacios
        .trim();
    
    const displayName = cleanName || 'Menú del día';
    const formattedDate = new Date(latestFile.dateUpdated || latestFile.dateCreated).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    
    // Crear tarjeta para el menú del mes actual
    const html = `
        <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div class="flex items-center mb-4">
                <i class="fas fa-utensils text-green-600 text-xl mr-3"></i>
                <h4 class="text-lg font-semibold text-gray-800">Menú</h4>
            </div>
            
            <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500">
                            <i class="fas fa-calendar-alt mr-1"></i>
                            Actualitzat: ${new Date(latestFile.dateUpdated || latestFile.dateCreated).toLocaleDateString('ca-ES', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            })}
                        </p>
                    </div>
                    <a href="${latestFile.webViewLink || latestFile.url}" 
                       target="_blank"
                       class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:scale-105 hover:shadow-lg active:scale-95 active:rotate-3 transition-all duration-300 ease-in-out">
                        <i class="fas fa-eye mr-2 transition-transform duration-300 hover:rotate-12"></i>
                        Vore menú
                    </a>
                </div>
            </div>
            
            <div class="mt-4 pt-4 border-t border-gray-200">
                <p class="text-sm text-gray-500 text-center">
                    <i class="fas fa-info-circle mr-1"></i>
                    Menú disponible per a consulta i descàrrega
                </p>
            </div>
        </div>
    `;
    
    menuContent.innerHTML = html;
}

// Función para cerrar el menú mensual
function cerrarMenuMensual() {
    const modal = document.getElementById('menuMensualModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Función para probar carpetas individuales
async function testIndividualFolders() {
    console.log('🧪 Probando carpetas individuales...');
    
    const testIds = {
        'memorias': '107i4-PA1dslnQaTTF69KemwA5V5cJxTn',
        'balance': '1UBLR4lCn8poDQIo7k2jGm2jcWmxh_DmD', 
        'subvenciones': '16wSaFGdFYv6UkrncvXIDxkfQBD4pAsED',
        'menus': '1IEOdQ3KlBtdnNs-XkYCySoHxSUTtu2F2'
    };
    
    for (const [name, id] of Object.entries(testIds)) {
        try {
            console.log(`📁 Probando ${name} con ID: ${id}`);
            const url = `${APPS_SCRIPT_URL}?folder=${id}&category=${name}`;
            console.log(`📡 URL: ${url}`);
            
            const response = await fetch(url);
            console.log(`📥 Estado ${name}:`, response.status, response.statusText);
            
            const data = await response.json();
            console.log(`📊 Datos ${name}:`, data);
            
            if (data.success) {
                console.log(`✅ ${name}: ${data.count} archivos encontrados`);
                if (data.files && data.files.length > 0) {
                    console.log(`📄 Archivos ${name}:`, data.files.map(f => f.name));
                }
            } else {
                console.log(`❌ ${name}: Error - ${data.error}`);
            }
            console.log('---');
        } catch (error) {
            console.log(`❌ ${name}: Error de conexión - ${error.message}`);
            console.log('---');
        }
    }
}
async function testMenuConnection() {
    console.log('🧪 Probando conexión con Google Apps Script...');
    
    try {
        const testUrl = `${APPS_SCRIPT_URL}?folder=${DRIVE_FOLDERS.menus}&category=menus`;
        console.log('📡 URL de prueba menú:', testUrl);
        
        const response = await fetch(testUrl);
        console.log('📥 Estado de la respuesta menú:', response.status, response.statusText);
        
        const data = await response.json();
        console.log('📊 Datos menú recibidos:', data);
        
        // Probar también transparencia
        const transparenciaUrl = APPS_SCRIPT_URL;
        console.log('� URL de prueba transparencia:', transparenciaUrl);
        
        const transResponse = await fetch(transparenciaUrl);
        console.log('📥 Estado de la respuesta transparencia:', transResponse.status, transResponse.statusText);
        
        const transData = await transResponse.json();
        console.log('� Datos transparencia recibidos:', transData);
        console.log('📊 Estructura transparencia:', JSON.stringify(transData, null, 2));
        
        return { menu: data, transparencia: transData };
    } catch (error) {
        console.error('❌ Error de conexión:', error);
        return null;
    }
}

// Función para descargar el menú completo (con detección automática del mes)
async function descargarMenuCompleto() {
    try {
        console.log('📥 Iniciando descarga del menú del mes actual...');
        
        // Obtener los archivos del menú
        const response = await fetch(`${APPS_SCRIPT_URL}?folder=${DRIVE_FOLDERS.menus}&category=menus`);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        const files = data.files || data;
        
        if (!files || files.length === 0) {
            alert('No hi ha arxius de menú disponibles per a descarregar.');
            return;
        }
        
        // Ordenar per data i agafar el més recent
        files.sort((a, b) => {
            const dateA = new Date(a.dateUpdated || a.dateCreated);
            const dateB = new Date(b.dateUpdated || b.dateCreated);
            return dateB - dateA; // Más reciente primero
        });
        
        const latestFile = files[0];
        
        // Obtenir el mes i any actual automàticament
        const meses = ['gener', 'febrer', 'març', 'abril', 'maig', 'juny', 'juliol', 'agost', 'setembre', 'octubre', 'novembre', 'desembre'];
        const fechaActual = new Date();
        const mesActual = meses[fechaActual.getMonth()];
        const añoActual = fechaActual.getFullYear();
        
        // Descargar el archivo más reciente
        const link = document.createElement('a');
        link.href = latestFile.url;
        link.download = latestFile.name;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('✅ Menú descargado:', latestFile.name);
        
        // Mostrar mensaje de confirmación con el mes actual
        alert(`✅ Menú de ${mesActual.charAt(0).toUpperCase() + mesActual.slice(1)} ${añoActual} descarregat\n\nArxiu: ${latestFile.name}\n\nEste és el menú corresponent al mes actual.`);
        
    } catch (error) {
        console.error('❌ Error descargando menú:', error);
        alert('Error al descarregar el menú. Per favor, intenta-ho de nou més tard.');
    }
}
