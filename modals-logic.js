        
        // Funció per a obrir modal de servicios
        function abrirModalServicio(servicio) {
            const modal = document.getElementById('servicioModal');
            const data = serviciosData[servicio];
            
            // Amagar botó "Volver arriba"
            const backToTopBtn = document.getElementById('back-to-top');
            if (backToTopBtn) {
                backToTopBtn.style.display = 'none';
                backToTopBtn.style.visibility = 'hidden';
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.pointerEvents = 'none';
            }
            
            if (modal && data) {
                // Ocultar navegación dentro del modal
                const navElement = modal.querySelector('nav');
                if (navElement) {
                    navElement.style.display = 'none';
                }
                
                // Ocultar navegación principal de la página
                const mainNav = document.querySelector('nav.fixed, nav.z-50');
                if (mainNav) {
                    mainNav.style.display = 'none';
                }
                
                // Crear i afegir botó X flotant
                setTimeout(() => {
                    const modal = document.getElementById('servicioModal');
                    if (modal) {
                        // Eliminar botón existente si hay alguno
                        const existingBtn = document.body.querySelector('#modal-close-btn');
                        if (existingBtn) {
                            existingBtn.remove();
                        }
                        
                        // Crear nuevo botón X
                        const closeButton = document.createElement('button');
                        closeButton.id = 'modal-close-btn';
                        closeButton.innerHTML = '<i class="fas fa-times"></i>';
                        closeButton.onclick = cerrarModalServicio;
                        closeButton.title = 'Tancar';
                        
                        // Aplicar estilos base primero
                        closeButton.style.position = 'fixed';
                        closeButton.style.top = '20px';
                        closeButton.style.right = '20px';
                        closeButton.style.zIndex = '99999';
                        closeButton.style.background = 'white';
                        closeButton.style.color = '#1f2937';
                        closeButton.style.width = '50px';
                        closeButton.style.height = '50px';
                        closeButton.style.borderRadius = '50%';
                        closeButton.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
                        closeButton.style.display = 'flex';
                        closeButton.style.alignItems = 'center';
                        closeButton.style.justifyContent = 'center';
                        closeButton.style.fontSize = '20px';
                        closeButton.style.fontWeight = 'bold';
                        closeButton.style.visibility = 'visible';
                        closeButton.style.opacity = '1';
                        closeButton.style.cursor = 'pointer';
                        closeButton.style.border = 'none';
                        
                        // Añadir animación de entrada
                        const style = document.createElement('style');
                        style.textContent = `
                            @keyframes modalCloseButtonEntrance {
                                0% {
                                    transform: scale(0) rotate(180deg);
                                    opacity: 0;
                                }
                                50% {
                                    transform: scale(1.2) rotate(90deg);
                                }
                                100% {
                                    transform: scale(1) rotate(0deg);
                                    opacity: 1;
                                }
                            }
                            
                            @keyframes modalCloseButtonPulse {
                                0%, 100% {
                                    transform: scale(1);
                                }
                                50% {
                                    transform: scale(1.05);
                                }
                            }
                            
                            @keyframes modalCloseButtonExit {
                                0% {
                                    transform: scale(1) rotate(0deg);
                                    opacity: 1;
                                }
                                100% {
                                    transform: scale(0) rotate(-180deg);
                                    opacity: 0;
                                }
                            }
                        `;
                        document.head.appendChild(style);
                        
                        // Aplicar animación de entrada
                        closeButton.style.animation = 'modalCloseButtonEntrance 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
                        
                        // Añadir hover effects mejorados
                        closeButton.addEventListener('mouseenter', () => {
                            closeButton.style.background = '#f3f4f6';
                            closeButton.style.transform = 'scale(1.1) rotate(5deg)';
                            closeButton.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.2)';
                            closeButton.style.animation = 'modalCloseButtonPulse 0.6s ease-in-out infinite';
                        });
                        
                        closeButton.addEventListener('mouseleave', () => {
                            closeButton.style.background = 'white';
                            closeButton.style.transform = 'scale(1) rotate(0deg)';
                            closeButton.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
                            closeButton.style.animation = 'none';
                        });
                        
                        // Añadir efecto de click
                        closeButton.addEventListener('mousedown', () => {
                            closeButton.style.transform = 'scale(0.95)';
                        });
                        
                        closeButton.addEventListener('mouseup', () => {
                            closeButton.style.transform = 'scale(1.1) rotate(5deg)';
                        });
                        
                        // Añadir al BODY
                        document.body.appendChild(closeButton);
                        console.log('Botó X creat i afegit al body amb animacions:', closeButton);
                    }
                }, 100);
                
                // Actualitzar contingut del modal
                const tituloElement = modal.querySelector('.modal-titulo');
                const contenidoElement = modal.querySelector('.modal-contenido');
                
                if (tituloElement) {
                    tituloElement.innerHTML = `
                        <h3 class="text-5xl font-bold text-white mb-4">${data.titulo}</h3>
                    `;
                }
                
                if (contenidoElement) {
                    let contenidoHTML = '';
                    
                    // Intro
                    if (data.intro) {
                        contenidoHTML += data.intro.map(parrafo => `<p class="text-gray-600 mb-6 text-lg leading-relaxed text-left">${parrafo}</p>`).join('');
                    }
                    
                    // Crear layout de 3 columnas
                    contenidoHTML += '<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">';
                    
                    // Necesidades
                    if (data.necesidades && data.necesidades.length > 0) {
                        contenidoHTML += `
                            <div class="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                                <h4 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                    <i class="fas fa-check-circle text-green-600 mr-3 text-lg"></i>
                                    Necessitats que atenem
                                </h4>
                                <ul class="space-y-3 text-left">
                                    ${data.necesidades.map(necesidad => `<li class="flex items-start text-left"><i class="fas fa-check text-green-600 mr-3 mt-1 text-sm flex-shrink-0"></i><span class="text-gray-700 text-base leading-relaxed text-left">${necesidad}</span></li>`).join('')}
                                </ul>
                            </div>
                        `;
                    }
                    
                    // Objetivos
                    if (data.objetivos && data.objetivos.length > 0) {
                        contenidoHTML += `
                            <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                                <h4 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                    <i class="fas fa-bullseye text-blue-600 mr-3 text-lg"></i>
                                    Objectius que perseguim
                                </h4>
                                <ul class="space-y-3 text-left">
                                    ${data.objetivos.map(objetivo => `<li class="flex items-start text-left"><i class="fas fa-bullseye text-blue-600 mr-3 mt-1 text-sm flex-shrink-0"></i><span class="text-gray-700 text-base leading-relaxed text-left">${objetivo}</span></li>`).join('')}
                                </ul>
                            </div>
                        `;
                    }
                    
                    // Acciones
                    if (data.acciones && data.acciones.length > 0) {
                        contenidoHTML += `
                            <div class="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                                <h4 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                    <i class="fas fa-hand-holding-heart text-purple-600 mr-3 text-lg"></i>
                                    Accions que realitzem
                                </h4>
                                <ul class="space-y-3 text-left">
                                    ${data.acciones.map(accion => `<li class="flex items-start text-left"><i class="fas fa-hand-holding-heart text-purple-600 mr-3 mt-1 text-sm flex-shrink-0"></i><span class="text-gray-700 text-base leading-relaxed text-left">${accion}</span></li>`).join('')}
                                </ul>
                            </div>
                        `;
                    }
                    
                    contenidoHTML += '</div>';
                    
                    // Información adicional - SIEMPRE VISIBLE
                    if (data.infoAdicional) {
                        contenidoHTML += `
                            <div class="mt-12 bg-green-50 border border-green-200 rounded-xl">
                                <div class="font-bold text-black text-xl p-4 text-left flex items-center">
                                    <i class="fas fa-info-circle text-green-600 mr-3 text-xl"></i>
                                    <span>Informació addicional</span>
                                </div>
                                <div class="pb-6 px-6 text-black text-lg leading-relaxed text-left">
                                    ${data.infoAdicional}
                                </div>
                            </div>
                        `;
                    }
                    
                    contenidoElement.innerHTML = contenidoHTML;
                    
                    // Configurar el desplegable d'informació addicional
                    const infoAdicional = document.getElementById('infoAdicional');
                    if (infoAdicional) {
                        let isOpened = false;
                        
                        infoAdicional.addEventListener('toggle', function(e) {
                            if (this.open && !isOpened) {
                                isOpened = true;
                                // Prevenir que es puga tancar
                                this.addEventListener('click', function preventClose(e) {
                                    if (isOpened && this.open) {
                                        e.preventDefault();
                                    }
                                });
                            }
                        });
                    }
                }
                
                // Mostrar modal
                modal.classList.remove('hidden');
                modal.classList.add('modal-enter');
                document.body.style.overflow = 'hidden';
                
                setTimeout(() => {
                    modal.classList.remove('modal-enter');
                    modal.classList.add('modal-enter-active');
                }, 10);
                
                // Scroll a l'inici del modal
                modal.scrollTop = 0;
            }
        }
        
        // Funció per a obrir modal de serveis i programa 2025
        function abrirModalServiciosPrograma() {
            const modal = document.getElementById('serviciosProgramaModal');
            
            // Amagar botó "Volver arriba"
            const backToTopBtn = document.getElementById('back-to-top');
            if (backToTopBtn) {
                backToTopBtn.style.display = 'none';
                backToTopBtn.style.visibility = 'hidden';
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.pointerEvents = 'none';
            }
            
            // Ocultar navegación principal de la página
            const mainNav = document.querySelector('nav.fixed, nav.z-50');
            if (mainNav) {
                mainNav.style.display = 'none';
            }
            
            // Crear i afegir botó X flotant
            setTimeout(() => {
                // Eliminar botón existente si hay alguno
                const existingBtn = document.body.querySelector('#modal-close-btn');
                if (existingBtn) {
                    existingBtn.remove();
                }
                
                // Crear nuevo botón X
                const closeButton = document.createElement('button');
                closeButton.id = 'modal-close-btn';
                closeButton.innerHTML = '<i class="fas fa-times"></i>';
                closeButton.onclick = cerrarModalServiciosPrograma;
                closeButton.title = 'Tancar';
                
                // Aplicar estilos base primero
                closeButton.style.position = 'fixed';
                closeButton.style.top = '20px';
                closeButton.style.right = '20px';
                closeButton.style.zIndex = '99999';
                closeButton.style.background = 'white';
                closeButton.style.color = '#1f2937';
                closeButton.style.width = '50px';
                closeButton.style.height = '50px';
                closeButton.style.borderRadius = '50%';
                closeButton.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
                closeButton.style.display = 'flex';
                closeButton.style.alignItems = 'center';
                closeButton.style.justifyContent = 'center';
                closeButton.style.fontSize = '20px';
                closeButton.style.fontWeight = 'bold';
                closeButton.style.visibility = 'visible';
                closeButton.style.opacity = '1';
                closeButton.style.cursor = 'pointer';
                closeButton.style.border = 'none';
                
                // Añadir animación de entrada
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes modalCloseButtonEntrance {
                        0% {
                            transform: scale(0) rotate(180deg);
                            opacity: 0;
                        }
                        50% {
                            transform: scale(1.2) rotate(90deg);
                        }
                        100% {
                            transform: scale(1) rotate(0deg);
                            opacity: 1;
                        }
                    }
                    
                    @keyframes modalCloseButtonPulse {
                        0%, 100% {
                            transform: scale(1);
                        }
                        50% {
                            transform: scale(1.05);
                        }
                    }
                `;
                document.head.appendChild(style);
                
                // Aplicar animación de entrada
                closeButton.style.animation = 'modalCloseButtonEntrance 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
                
                // Añadir hover effects mejorados
                closeButton.addEventListener('mouseenter', () => {
                    closeButton.style.background = '#f3f4f6';
                    closeButton.style.transform = 'scale(1.1) rotate(5deg)';
                    closeButton.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.2)';
                    closeButton.style.animation = 'modalCloseButtonPulse 0.6s ease-in-out infinite';
                });
                
                closeButton.addEventListener('mouseleave', () => {
                    closeButton.style.background = 'white';
                    closeButton.style.transform = 'scale(1) rotate(0deg)';
                    closeButton.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
                    closeButton.style.animation = 'none';
                });
                
                // Añadir efecto de click
                closeButton.addEventListener('mousedown', () => {
                    closeButton.style.transform = 'scale(0.95)';
                });
                
                closeButton.addEventListener('mouseup', () => {
                    closeButton.style.transform = 'scale(1.1) rotate(5deg)';
                });
                
                // Añadir al BODY
                document.body.appendChild(closeButton);
                console.log('Botó X creat i afegit al body amb animacions:', closeButton);
            }, 100);
            
            // Guardar la posició actual del scroll
            sessionStorage.setItem('apemar_modal_scroll_position', window.pageYOffset);
            
            // Establir scroll a 0 immediatament abans de mostrar el modal
            window.scrollTo(0, 0);
            
            // Mostrar el modal
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Assegurar que el modal estiga en la part superior
            modal.scrollTop = 0;
        }
        
        // Funció per a tancar modal de serveis i programa 2025
        function cerrarModalServiciosPrograma() {
            const modal = document.getElementById('serviciosProgramaModal');
            
            // Eliminar el botón X flotante del BODY directamente
            const closeBtn = document.body.querySelector('#modal-close-btn');
            if (closeBtn) {
                closeBtn.remove();
            }
            
            // Restaurar botó "Volver arriba"
            const backToTopBtn = document.getElementById('back-to-top');
            if (backToTopBtn) {
                backToTopBtn.style.display = '';
                backToTopBtn.style.visibility = '';
                backToTopBtn.style.opacity = '';
                backToTopBtn.style.pointerEvents = '';
            }
            
            // Restaurar navegación principal de la página
            const mainNav = document.querySelector('nav.fixed, nav.z-50');
            if (mainNav) {
                mainNav.style.display = '';
            }
            
            modal.classList.add('modal-exit');
            
            setTimeout(() => {
                modal.classList.remove('modal-exit-active');
                modal.classList.add('modal-exit');
            }, 10);
            
            setTimeout(() => {
                modal.classList.add('hidden');
                modal.classList.remove('modal-enter-active', 'modal-exit');
                document.body.style.overflow = 'auto';
                
                // Forçar scroll instantani sense transició
                const savedPosition = sessionStorage.getItem('apemar_modal_scroll_position');
                if (savedPosition) {
                    document.documentElement.style.scrollBehavior = 'auto';
                    window.scrollTo(0, parseInt(savedPosition, 10));
                    // Restaurar comportament normal després del scroll
                    setTimeout(() => {
                        document.documentElement.style.scrollBehavior = '';
                    }, 10);
                    sessionStorage.removeItem('apemar_modal_scroll_position');
                }
            }, 10);
        }
        
        // Funció per a tancar modal de servicios
        function cerrarModalServicio() {
            const modal = document.getElementById('servicioModal');
            
            // Eliminar el botón X flotante del BODY directamente
            const closeBtn = document.body.querySelector('#modal-close-btn');
            if (closeBtn) {
                closeBtn.remove();
            }
            
            // Restaurar botó "Volver arriba"
            const backToTopBtn = document.getElementById('back-to-top');
            if (backToTopBtn) {
                backToTopBtn.style.display = '';
                backToTopBtn.style.visibility = '';
                backToTopBtn.style.opacity = '';
                backToTopBtn.style.pointerEvents = '';
            }
            
            // Restaurar navegación principal de la página
            const mainNav = document.querySelector('nav.fixed, nav.z-50');
            if (mainNav) {
                mainNav.style.display = '';
            }
            
            modal.classList.add('modal-exit');
            
            setTimeout(() => {
                modal.classList.remove('modal-exit-active');
                modal.classList.add('modal-exit');
            }, 10);
            
            setTimeout(() => {
                modal.classList.add('hidden');
                modal.classList.remove('modal-enter-active', 'modal-exit');
                document.body.style.overflow = 'auto';
            }, 10);
        }
        // Función para mostrar el modal con el servicio seleccionado
        function mostrarServicio(servicioId) {
            const servicio = serviciosData[servicioId];
            if (!servicio) return;

            const contenidoHTML = `
                <div class="mb-10">
                    <button type="button" id="backButton" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition transform hover:scale-105 hover:shadow-lg active:scale-95 btn-exit-animation">
                        <i class="fas fa-arrow-left mr-2"></i>
                        Eixir
                    </button>
                </div>
                
                <div class="service-section mb-16" id="${servicioId}">
                    <div class="bg-gray-50 rounded-2xl p-8">
                        <div class="flex items-center mb-6">
                            <div class="text-green-600 mr-4">
                                <i class="fas ${servicio.icono} text-3xl"></i>
                            </div>
                            <h2 class="text-2xl font-bold text-gray-800">${servicio.titulo}</h2>
                        </div>
                        
                        <div class="mb-8 service-intro">
                            ${servicio.intro.map(p => `<p class="text-gray-600 mb-4">${p}</p>`).join('')}
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 service-columns">
                            <div>
                                <h3 class="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                                    <i class="fas fa-heart text-green-600 mr-2"></i>
                                    Necessitats que atenem
                                </h3>
                                <ul class="space-y-2 text-gray-600 text-left">
                                    ${servicio.necesidades.map(n => `<li class="flex items-start text-left"><i class="fas fa-check text-green-600 mr-2 mt-1 flex-shrink-0"></i><span class="text-left">${n}</span></li>`).join('')}
                                </ul>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                                    <i class="fas fa-bullseye text-green-600 mr-2"></i>
                                    Objectius que perseguim
                                </h3>
                                <ul class="space-y-2 text-gray-600 text-left">
                                    ${servicio.objetivos.map(o => `<li class="flex items-start text-left"><i class="fas fa-star text-green-600 mr-2 mt-1 flex-shrink-0"></i><span class="text-left">${o}</span></li>`).join('')}
                                </ul>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                                    <i class="fas fa-cogs text-green-600 mr-2"></i>
                                    Accions que realitzem
                                </h3>
                                <ul class="space-y-2 text-gray-600 text-left">
                                    ${servicio.acciones.map(a => `<li class="flex items-start text-left"><i class="fas fa-arrow-right text-green-600 mr-2 mt-1 flex-shrink-0"></i><span class="text-left">${a}</span></li>`).join('')}
                                </ul>
                            </div>
                        </div>
                        
                        <div class="mt-8 p-6 bg-green-50 rounded-xl cursor-pointer hover:bg-green-100 transition-colors duration-200">
                        <div class="font-semibold text-gray-800 flex items-center rounded-lg w-full">
                            <i class="fas fa-info-circle text-green-600 mr-2"></i>
                            Informació addicional
                        </div>
                        <div class="mt-3 text-gray-600">
                            ${servicio.infoAdicional}
                        </div>
                    </div>
                    </div>
                </div>
            `;

            const modal = document.getElementById('servicioModal');
            document.getElementById('modalContenido').innerHTML = contenidoHTML;
            
            // Fer scroll al principi del modal
            modal.scrollTop = 0;
            
            // Animació d'entrada
            modal.classList.remove('hidden');
            modal.classList.add('modal-enter');
            
            setTimeout(() => {
                modal.classList.remove('modal-enter');
                modal.classList.add('modal-enter-active');
                // Assegurar scroll al principi després de l'animació
                modal.scrollTop = 0;
            }, 10);
            
            document.body.style.overflow = 'hidden';
            
            // Afegir event listener al botó d'enrere dins del contingut
            setTimeout(() => {
                const backButton = document.getElementById('backButton');
                if (backButton) {
                    backButton.addEventListener('click', cerrarModal);
                }
                
                // Fer que tota la hitbox de details siga clicable
                const detailsElements = modal.querySelectorAll('details.bg-green-50');
                detailsElements.forEach(details => {
                    const content = details.querySelector('div');
                    
                    // Establir estat inicial
                    if (!details.open) {
                        content.style.opacity = '0';
                        content.style.transform = 'translateY(15px) scale(0.95)';
                    } else {
                        content.style.opacity = '1';
                        content.style.transform = 'translateY(0) scale(1)';
                    }
                    
                    details.addEventListener('click', function(e) {
                        // Només obrir/tancar si no s'ha fet clic en un enllaç dins del contingut
                        if (!e.target.closest('a')) {
                            e.preventDefault();
                            
                            if (this.open) {
                                // No fer res si ja està obert - no permetre tancar
                                return;
                            } else {
                                // Obrir - canviar estat primer, després animar
                                this.open = true;
                                
                                // Forçar reflow
                                content.offsetHeight;
                                
                                // Animar a estat obert
                                setTimeout(() => {
                                    content.style.transition = 'all 0.4s ease-out';
                                    content.style.opacity = '1';
                                    content.style.transform = 'translateY(0) scale(1)';
                                }, 10);
                            }
                        }
                    });
                });
            }, 10);
        }

        // Función para cerrar el modal
        function cerrarModal() {
            const modal = document.getElementById('servicioModal');
            
            // Animación de salida
            modal.classList.remove('modal-enter-active');
            modal.classList.add('modal-exit');
            
            setTimeout(() => {
                modal.classList.remove('modal-exit');
                modal.classList.add('modal-exit-active');
            }, 10);
            
            setTimeout(() => {
                modal.classList.add('hidden');
                modal.classList.remove('modal-exit-active');
                document.body.style.overflow = 'auto';
            }, 200);
        }

        // Event listeners
        document.addEventListener('DOMContentLoaded', function() {
            // Manejar el enlace Nosotros con scroll personalizado
            const nosotrosLink = document.getElementById('nosotros-link');
            if (nosotrosLink) {
                nosotrosLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('¡Enlace Nosotros pulsado!');
                    const targetElement = document.getElementById('dades-programa');
                    if (targetElement) {
                        // Calcular posición para centrar la sección en pantalla
                        const viewportHeight = window.innerHeight;
                        const elementHeight = targetElement.offsetHeight;
                        const offsetTop = targetElement.offsetTop - (viewportHeight / 2) + (elementHeight / 2);
                        console.log('Desplazando a dades-programa (centrado):', offsetTop, 'a las', new Date().getTime());
                        window.scrollTo({top: offsetTop, behavior: 'smooth'});
                    }
                });
            }
            
            // Cerrar modal con la tecla Escape
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    cerrarModal();
                }
            });

            // Modificar los enlaces de servicios para usar el modal
            const serviciosLinks = document.querySelectorAll('a[href^="servicios.html?servicio="]');
            serviciosLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const servicioId = this.href.split('servicio=')[1];
                    mostrarServicio(servicioId);
                });
            });
        });
        // Funció per a obrir modal de Envejecimiento Activo
        function abrirModalEnvejecimientoActivo() {
            const modal = document.getElementById('servicioModal');
            const data = serviciosData.envejecimientoActivo;
            
            // Amagar botó "Volver arriba"
            const backToTopBtn = document.getElementById('back-to-top');
            if (backToTopBtn) {
                backToTopBtn.style.display = 'none';
                backToTopBtn.style.visibility = 'hidden';
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.pointerEvents = 'none';
            }
            
            if (modal && data) {
                // Ocultar navegación dentro del modal
                const navElement = modal.querySelector('nav');
                if (navElement) {
                    navElement.style.display = 'none';
                }
                
                // Ocultar navegación principal de la página
                const mainNav = document.querySelector('nav.fixed, nav.z-50');
                if (mainNav) {
                    mainNav.style.display = 'none';
                }
                
                // Crear i afegir botó X flotant
                setTimeout(() => {
                    const modal = document.getElementById('servicioModal');
                    if (modal) {
                        // Eliminar botón existente si hay alguno
                        const existingBtn = document.body.querySelector('#modal-close-btn');
                        if (existingBtn) {
                            existingBtn.remove();
                        }
                        
                        // Crear nuevo botón X
                        const closeButton = document.createElement('button');
                        closeButton.id = 'modal-close-btn';
                        closeButton.innerHTML = '<i class="fas fa-times"></i>';
                        closeButton.onclick = cerrarModalServicio;
                        closeButton.title = 'Tancar';
                        
                        // Aplicar estilos base primero
                        closeButton.style.position = 'fixed';
                        closeButton.style.top = '20px';
                        closeButton.style.right = '20px';
                        closeButton.style.zIndex = '99999';
                        closeButton.style.background = 'white';
                        closeButton.style.color = '#1f2937';
                        closeButton.style.width = '50px';
                        closeButton.style.height = '50px';
                        closeButton.style.borderRadius = '50%';
                        closeButton.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
                        closeButton.style.display = 'flex';
                        closeButton.style.alignItems = 'center';
                        closeButton.style.justifyContent = 'center';
                        closeButton.style.fontSize = '20px';
                        closeButton.style.fontWeight = 'bold';
                        closeButton.style.visibility = 'visible';
                        closeButton.style.opacity = '1';
                        closeButton.style.cursor = 'pointer';
                        closeButton.style.border = 'none';
                        
                        // Añadir animación de entrada
                        const style = document.createElement('style');
                        style.textContent = `
                            @keyframes modalCloseButtonEntrance {
                                0% {
                                    transform: scale(0) rotate(180deg);
                                    opacity: 0;
                                }
                                50% {
                                    transform: scale(1.2) rotate(90deg);
                                }
                                100% {
                                    transform: scale(1) rotate(0deg);
                                    opacity: 1;
                                }
                            }
                            
                            @keyframes modalCloseButtonPulse {
                                0%, 100% {
                                    transform: scale(1);
                                }
                                50% {
                                    transform: scale(1.05);
                                }
                            }
                            
                            @keyframes modalCloseButtonExit {
                                0% {
                                    transform: scale(1) rotate(0deg);
                                    opacity: 1;
                                }
                                100% {
                                    transform: scale(0) rotate(-180deg);
                                    opacity: 0;
                                }
                            }
                        `;
                        document.head.appendChild(style);
                        
                        // Aplicar animación de entrada
                        closeButton.style.animation = 'modalCloseButtonEntrance 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
                        
                        // Añadir hover effects mejorados
                        closeButton.addEventListener('mouseenter', () => {
                            closeButton.style.background = '#f3f4f6';
                            closeButton.style.transform = 'scale(1.1) rotate(5deg)';
                            closeButton.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.2)';
                            closeButton.style.animation = 'modalCloseButtonPulse 0.6s ease-in-out infinite';
                        });
                        
                        closeButton.addEventListener('mouseleave', () => {
                            closeButton.style.background = 'white';
                            closeButton.style.transform = 'scale(1) rotate(0deg)';
                            closeButton.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
                            closeButton.style.animation = 'none';
                        });
                        
                        // Añadir efecto de click
                        closeButton.addEventListener('mousedown', () => {
                            closeButton.style.transform = 'scale(0.95)';
                        });
                        
                        closeButton.addEventListener('mouseup', () => {
                            closeButton.style.transform = 'scale(1.1) rotate(5deg)';
                        });
                        
                        // Añadir al BODY
                        document.body.appendChild(closeButton);
                        console.log('Botó X creat i afegit al body amb animacions:', closeButton);
                    }
                }, 100);
                
                // Actualitzar contingut del modal - EXACTAMENTE igual que els altres serveis
                const tituloElement = modal.querySelector('.modal-titulo');
                const contenidoElement = modal.querySelector('.modal-contenido');
                
                if (tituloElement) {
                    tituloElement.innerHTML = `
                        <h3 class="text-5xl font-bold text-white mb-4">${data.titulo}</h3>
                    `;
                }
                
                if (contenidoElement) {
                    let contenidoHTML = '';
                    
                    // Intro
                    if (data.intro) {
                        contenidoHTML += data.intro.map(parrafo => `<p class="text-gray-600 mb-6 text-lg leading-relaxed text-left">${parrafo}</p>`).join('');
                    }
                    
                    // Imagen activo2.jpg en el modal
                    contenidoHTML += '<div class="mb-8"><img src="fotos/activo2.jpg" alt="Envejecimiento Activo" class="w-full h-96 object-cover rounded-lg shadow-lg"></div>';
                    
                    // Crear layout de 3 columnas
                    contenidoHTML += '<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">';
                    
                    // Necesidades
                    if (data.necesidades && data.necesidades.length > 0) {
                        contenidoHTML += `
                            <div class="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                                <h4 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                    <i class="fas fa-check-circle text-green-600 mr-3 text-lg"></i>
                                    Necesidades que abordamos
                                </h4>
                                <ul class="space-y-3 text-left">
                                    ${data.necesidades.map(necesidad => `<li class="flex items-start text-left"><i class="fas fa-check text-green-600 mr-3 mt-1 text-sm flex-shrink-0"></i><span class="text-gray-700 text-base leading-relaxed text-left">${necesidad}</span></li>`).join('')}
                                </ul>
                            </div>
                        `;
                    }
                    
                    // Objetivos
                    if (data.objetivos && data.objetivos.length > 0) {
                        contenidoHTML += `
                            <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                                <h4 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                    <i class="fas fa-bullseye text-blue-600 mr-3 text-lg"></i>
                                    Objetivos
                                </h4>
                                <ul class="space-y-3 text-left">
                                    ${data.objetivos.map(objetivo => `<li class="flex items-start text-left"><i class="fas fa-bullseye text-blue-600 mr-3 mt-1 text-sm flex-shrink-0"></i><span class="text-gray-700 text-base leading-relaxed text-left">${objetivo}</span></li>`).join('')}
                                </ul>
                            </div>
                        `;
                    }
                    
                    // Acciones
                    if (data.acciones && data.acciones.length > 0) {
                        contenidoHTML += `
                            <div class="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                                <h4 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                    <i class="fas fa-hand-holding-heart text-purple-600 mr-3 text-lg"></i>
                                    Acciones que realizamos
                                </h4>
                                <ul class="space-y-3 text-left">
                                    ${data.acciones.map(accion => `<li class="flex items-start text-left"><i class="fas fa-hand-holding-heart text-purple-600 mr-3 mt-1 text-sm flex-shrink-0"></i><span class="text-gray-700 text-base leading-relaxed text-left">${accion}</span></li>`).join('')}
                                </ul>
                            </div>
                        `;
                    }
                    
                    contenidoHTML += '</div>';
                    
                    // Información adicional - SIEMPRE VISIBLE
                    if (data.infoAdicional) {
                        contenidoHTML += `
                            <div class="mt-12 bg-green-50 border border-green-200 rounded-xl">
                                <div class="font-bold text-black text-xl p-4 text-left flex items-center">
                                    <i class="fas fa-info-circle text-green-600 mr-3 text-xl"></i>
                                    <span>Información adicional</span>
                                </div>
                                <div class="pb-6 px-6 text-black text-lg leading-relaxed text-left">
                                    ${data.infoAdicional}
                                </div>
                            </div>
                        `;
                    }
                    
                    contenidoElement.innerHTML = contenidoHTML;
                }
                
                // NO guardar posició ni fer scroll - mantindre la pàgina on està
                // sessionStorage.setItem('apemar_modal_scroll_position', window.pageYOffset);
                // window.scrollTo(0, 0);
                
                // Mostrar el modal
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
                
                // Assegurar que el modal estiga en la part superior
                modal.scrollTop = 0;
                
                // Animació d'entrada
                setTimeout(() => {
                    modal.classList.remove('modal-exit');
                    modal.classList.add('modal-enter');
                    
                    setTimeout(() => {
                        modal.classList.remove('modal-enter');
                        modal.classList.add('modal-enter-active');
                    }, 10);
                }, 10);
                
                // Configurar el botón de salir
                const backButton = document.getElementById('backButton');
                if (backButton) {
                    backButton.onclick = function(e) {
                        e.preventDefault();
                        cerrarModalServicio();
                    };
                }
            }
        }
        function openConsejosFamiliesModal() {
            const modal = document.getElementById('consejosFamiliesModal');
            if (modal) {
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
                
                // Crear botón X flotante
                const existingBtn = document.body.querySelector('#consejos-close-btn');
                if (existingBtn) {
                    existingBtn.remove();
                }
                
                const closeButton = document.createElement('button');
                closeButton.id = 'consejos-close-btn';
                closeButton.innerHTML = '<i class="fas fa-times"></i>';
                closeButton.onclick = closeConsejosFamiliesModal;
                closeButton.title = 'Tancar';
                
                closeButton.style.position = 'fixed';
                closeButton.style.top = '20px';
                closeButton.style.right = '20px';
                closeButton.style.zIndex = '99999';
                closeButton.style.background = 'white';
                closeButton.style.color = '#1f2937';
                closeButton.style.width = '50px';
                closeButton.style.height = '50px';
                closeButton.style.borderRadius = '50%';
                closeButton.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
                closeButton.style.border = '2px solid #e5e7eb';
                closeButton.style.cursor = 'pointer';
                closeButton.style.display = 'flex';
                closeButton.style.alignItems = 'center';
                closeButton.style.justifyContent = 'center';
                closeButton.style.fontSize = '18px';
                closeButton.style.transition = 'all 0.3s ease';
                
                document.body.appendChild(closeButton);
            }
        }

        function closeConsejosFamiliesModal() {
            const modal = document.getElementById('consejosFamiliesModal');
            if (modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
                
                const closeBtn = document.body.querySelector('#consejos-close-btn');
                if (closeBtn) {
                    closeBtn.remove();
                }
            }
        }
