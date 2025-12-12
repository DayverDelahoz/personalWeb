/**
 * Funcionalidades de Accesibilidad
 * Mejoras para usuarios con discapacidades visuales, motoras y cognitivas
 */

class AccessibilityFeatures {
    constructor() {
        this.settings = {
            highContrast: false,
            largeText: false,
            reducedMotion: false,
            keyboardNavigation: true
        };
        
        this.init();
    }

    /**
     * Inicializa todas las funcionalidades de accesibilidad
     */
    init() {
        this.loadUserPreferences();
        this.enhanceKeyboardNavigation();
        this.addAccessibilityControls();
        this.improveFormAccessibility();
        this.enhanceVideoAccessibility();
        this.setupScreenReaderSupport();
        this.detectUserPreferences();
    }

    /**
     * Detecta preferencias del sistema del usuario
     */
    detectUserPreferences() {
        // Detectar preferencia de movimiento reducido
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.settings.reducedMotion = true;
            this.applyReducedMotion();
        }

        // Detectar preferencia de alto contraste
        if (window.matchMedia('(prefers-contrast: high)').matches) {
            this.settings.highContrast = true;
            this.applyHighContrast();
        }

        // Escuchar cambios en las preferencias
        window.matchMedia('(prefers-reduced-motion: reduce)').addListener((e) => {
            this.settings.reducedMotion = e.matches;
            this.applyReducedMotion();
        });

        window.matchMedia('(prefers-contrast: high)').addListener((e) => {
            this.settings.highContrast = e.matches;
            this.applyHighContrast();
        });
    }

    /**
     * Carga las preferencias del usuario desde localStorage
     */
    loadUserPreferences() {
        const saved = localStorage.getItem('accessibilitySettings');
        if (saved) {
            this.settings = { ...this.settings, ...JSON.parse(saved) };
            this.applyAllSettings();
        }
    }

    /**
     * Guarda las preferencias del usuario
     */
    saveUserPreferences() {
        localStorage.setItem('accessibilitySettings', JSON.stringify(this.settings));
    }

    /**
     * Añade controles de accesibilidad a la página
     */
    addAccessibilityControls() {
        const controlsHTML = `
            <div id="accessibility-controls" class="accessibility-controls" role="region" aria-label="Controles de accesibilidad">
                <button id="accessibility-toggle" 
                        class="accessibility-toggle" 
                        aria-expanded="false"
                        aria-controls="accessibility-menu"
                        title="Abrir menú de accesibilidad">
                    <span class="sr-only">Opciones de accesibilidad</span>
                    ♿
                </button>
                <div id="accessibility-menu" class="accessibility-menu" hidden>
                    <h3>Opciones de Accesibilidad</h3>
                    <div class="accessibility-options">
                        <button class="accessibility-option" data-action="toggleHighContrast">
                            <span class="option-icon">🎨</span>
                            <span class="option-text">Alto Contraste</span>
                            <span class="option-status" id="contrast-status">Desactivado</span>
                        </button>
                        <button class="accessibility-option" data-action="toggleLargeText">
                            <span class="option-icon">🔍</span>
                            <span class="option-text">Texto Grande</span>
                            <span class="option-status" id="text-status">Desactivado</span>
                        </button>
                        <button class="accessibility-option" data-action="toggleReducedMotion">
                            <span class="option-icon">⏸️</span>
                            <span class="option-text">Reducir Movimiento</span>
                            <span class="option-status" id="motion-status">Desactivado</span>
                        </button>
                        <button class="accessibility-option" data-action="showKeyboardHelp">
                            <span class="option-icon">⌨️</span>
                            <span class="option-text">Ayuda de Teclado</span>
                            <span class="option-status">Ver atajos</span>
                        </button>
                        <button class="accessibility-option" data-action="resetSettings">
                            <span class="option-icon">🔄</span>
                            <span class="option-text">Restablecer</span>
                            <span class="option-status">Todo por defecto</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Insertar controles al final del body
        document.body.insertAdjacentHTML('beforeend', controlsHTML);

        // Añadir estilos CSS dinámicamente
        this.addAccessibilityStyles();

        // Configurar event listeners
        this.setupAccessibilityControls();
    }

    /**
     * Añade estilos CSS para las funcionalidades de accesibilidad
     */
    addAccessibilityStyles() {
        const styles = `
            <style id="accessibility-styles">
                .accessibility-controls {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 10000;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }

                .accessibility-toggle {
                    background: #2563eb;
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 60px;
                    height: 60px;
                    font-size: 24px;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .accessibility-toggle:hover,
                .accessibility-toggle:focus {
                    background: #1d4ed8;
                    transform: scale(1.05);
                    outline: 2px solid #60a5fa;
                    outline-offset: 2px;
                }

                .accessibility-menu {
                    position: absolute;
                    bottom: 70px;
                    right: 0;
                    background: white;
                    border: 1px solid #d1d5db;
                    border-radius: 8px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                    padding: 16px;
                    min-width: 280px;
                    max-width: 320px;
                }

                .accessibility-menu h3 {
                    margin: 0 0 12px 0;
                    font-size: 16px;
                    font-weight: 600;
                    color: #374151;
                }

                .accessibility-options {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .accessibility-option {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px;
                    border: 1px solid #e5e7eb;
                    border-radius: 6px;
                    background: #f9fafb;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    text-align: left;
                    width: 100%;
                }

                .accessibility-option:hover,
                .accessibility-option:focus {
                    background: #f3f4f6;
                    border-color: #2563eb;
                    outline: none;
                }

                .option-icon {
                    font-size: 20px;
                    width: 24px;
                    text-align: center;
                }

                .option-text {
                    flex: 1;
                    font-weight: 500;
                    color: #374151;
                }

                .option-status {
                    font-size: 12px;
                    color: #6b7280;
                    font-weight: normal;
                }

                /* Estados activos */
                .accessibility-option.active .option-status {
                    color: #059669;
                    font-weight: 600;
                }

                .accessibility-option.active {
                    background: #ecfdf5;
                    border-color: #059669;
                }

                /* Modo alto contraste */
                body.high-contrast {
                    filter: contrast(150%);
                }

                body.high-contrast * {
                    background-color: black !important;
                    color: white !important;
                    border-color: white !important;
                }

                body.high-contrast a {
                    color: #00ffff !important;
                }

                body.high-contrast a:visited {
                    color: #ffff00 !important;
                }

                /* Texto grande */
                body.large-text {
                    font-size: 18px !important;
                }

                body.large-text h1 { font-size: 2.8rem !important; }
                body.large-text h2 { font-size: 2.2rem !important; }
                body.large-text h3 { font-size: 1.8rem !important; }
                body.large-text p, body.large-text li { font-size: 18px !important; }
                body.large-text button { font-size: 18px !important; padding: 12px 16px !important; }
                body.large-text input, body.large-text textarea { font-size: 18px !important; }

                /* Movimiento reducido */
                body.reduced-motion *, 
                body.reduced-motion *::before, 
                body.reduced-motion *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }

                /* Enfoque mejorado */
                .enhanced-focus *:focus {
                    outline: 3px solid #ff6b35 !important;
                    outline-offset: 2px !important;
                    box-shadow: 0 0 0 5px rgba(255, 107, 53, 0.3) !important;
                }

                /* Skip links mejorados */
                .skip-link:focus {
                    background: #000;
                    color: #fff;
                    font-weight: bold;
                    padding: 12px 16px;
                    z-index: 10001;
                }

                /* Ocultar para lectores de pantalla solamente */
                .sr-only {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    padding: 0;
                    margin: -1px;
                    overflow: hidden;
                    clip: rect(0, 0, 0, 0);
                    white-space: nowrap;
                    border: 0;
                }

                /* Modal de ayuda de teclado */
                .keyboard-help-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    z-index: 10002;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }

                .keyboard-help-content {
                    background: white;
                    border-radius: 8px;
                    padding: 24px;
                    max-width: 600px;
                    max-height: 80vh;
                    overflow-y: auto;
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
                }

                .keyboard-shortcut {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 8px 0;
                    border-bottom: 1px solid #e5e7eb;
                }

                .shortcut-key {
                    background: #f3f4f6;
                    color: #374151;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-family: monospace;
                    font-weight: bold;
                }

                @media (max-width: 768px) {
                    .accessibility-controls {
                        bottom: 10px;
                        right: 10px;
                    }
                    
                    .accessibility-toggle {
                        width: 50px;
                        height: 50px;
                        font-size: 20px;
                    }
                    
                    .accessibility-menu {
                        bottom: 60px;
                        right: -10px;
                        min-width: 260px;
                    }
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }

    /**
     * Configura los event listeners para los controles de accesibilidad
     */
    setupAccessibilityControls() {
        const toggle = document.getElementById('accessibility-toggle');
        const menu = document.getElementById('accessibility-menu');
        const options = document.querySelectorAll('.accessibility-option');

        // Toggle del menú
        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !isExpanded);
            menu.hidden = isExpanded;
        });

        // Cerrar menú con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !menu.hidden) {
                menu.hidden = true;
                toggle.setAttribute('aria-expanded', 'false');
                toggle.focus();
            }
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.accessibility-controls')) {
                menu.hidden = true;
                toggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Event listeners para las opciones
        options.forEach(option => {
            option.addEventListener('click', () => {
                const action = option.dataset.action;
                this.handleAccessibilityAction(action, option);
            });
        });

        // Actualizar estado inicial de los controles
        this.updateControlStates();
    }

    /**
     * Maneja las acciones de accesibilidad
     */
    handleAccessibilityAction(action, element) {
        switch (action) {
            case 'toggleHighContrast':
                this.toggleHighContrast();
                break;
            case 'toggleLargeText':
                this.toggleLargeText();
                break;
            case 'toggleReducedMotion':
                this.toggleReducedMotion();
                break;
            case 'showKeyboardHelp':
                this.showKeyboardHelp();
                break;
            case 'resetSettings':
                this.resetAllSettings();
                break;
        }
        this.updateControlStates();
    }

    /**
     * Toggle alto contraste
     */
    toggleHighContrast() {
        this.settings.highContrast = !this.settings.highContrast;
        this.applyHighContrast();
        this.saveUserPreferences();
        this.announceChange('Alto contraste', this.settings.highContrast);
    }

    /**
     * Toggle texto grande
     */
    toggleLargeText() {
        this.settings.largeText = !this.settings.largeText;
        this.applyLargeText();
        this.saveUserPreferences();
        this.announceChange('Texto grande', this.settings.largeText);
    }

    /**
     * Toggle movimiento reducido
     */
    toggleReducedMotion() {
        this.settings.reducedMotion = !this.settings.reducedMotion;
        this.applyReducedMotion();
        this.saveUserPreferences();
        this.announceChange('Movimiento reducido', this.settings.reducedMotion);
    }

    /**
     * Aplica configuración de alto contraste
     */
    applyHighContrast() {
        document.body.classList.toggle('high-contrast', this.settings.highContrast);
    }

    /**
     * Aplica configuración de texto grande
     */
    applyLargeText() {
        document.body.classList.toggle('large-text', this.settings.largeText);
    }

    /**
     * Aplica configuración de movimiento reducido
     */
    applyReducedMotion() {
        document.body.classList.toggle('reduced-motion', this.settings.reducedMotion);
    }

    /**
     * Aplica todas las configuraciones
     */
    applyAllSettings() {
        this.applyHighContrast();
        this.applyLargeText();
        this.applyReducedMotion();
    }

    /**
     * Resetea todas las configuraciones
     */
    resetAllSettings() {
        this.settings = {
            highContrast: false,
            largeText: false,
            reducedMotion: false,
            keyboardNavigation: true
        };
        
        this.applyAllSettings();
        this.saveUserPreferences();
        this.updateControlStates();
        
        this.announceChange('Configuraciones restablecidas', true);
    }

    /**
     * Actualiza el estado visual de los controles
     */
    updateControlStates() {
        const updates = [
            { id: 'contrast-status', active: this.settings.highContrast, text: ['Desactivado', 'Activado'] },
            { id: 'text-status', active: this.settings.largeText, text: ['Desactivado', 'Activado'] },
            { id: 'motion-status', active: this.settings.reducedMotion, text: ['Desactivado', 'Activado'] }
        ];

        updates.forEach(({ id, active, text }) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = text[active ? 1 : 0];
                element.closest('.accessibility-option').classList.toggle('active', active);
            }
        });
    }

    /**
     * Mejora la navegación por teclado
     */
    enhanceKeyboardNavigation() {
        // Añadir indicadores de foco mejorados
        document.body.classList.add('enhanced-focus');

        // Manejar navegación por Tab más intuitiva
        document.addEventListener('keydown', (e) => {
            // Alt + 1: Ir al contenido principal
            if (e.altKey && e.key === '1') {
                e.preventDefault();
                const mainContent = document.getElementById('main-content') || document.querySelector('main');
                if (mainContent) {
                    mainContent.focus();
                    mainContent.scrollIntoView();
                }
            }

            // Alt + 2: Ir a la navegación
            if (e.altKey && e.key === '2') {
                e.preventDefault();
                const nav = document.querySelector('nav a');
                if (nav) {
                    nav.focus();
                }
            }

            // Alt + 3: Ir al buscador
            if (e.altKey && e.key === '3') {
                e.preventDefault();
                const search = document.getElementById('site-search');
                if (search) {
                    search.focus();
                }
            }

            // Escape: Cerrar elementos abiertos
            if (e.key === 'Escape') {
                this.closeOpenElements();
            }
        });

        // Mostrar outline solo cuando se navega con teclado
        document.addEventListener('mousedown', () => {
            document.body.classList.add('using-mouse');
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.remove('using-mouse');
            }
        });
    }

    /**
     * Mejora la accesibilidad de formularios
     */
    improveFormAccessibility() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            // Añadir aria-describedby a campos con ayuda
            const formGroups = form.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                const input = group.querySelector('input, select, textarea');
                const help = group.querySelector('small');
                
                if (input && help && !help.id) {
                    const helpId = 'help-' + Math.random().toString(36).substr(2, 9);
                    help.id = helpId;
                    input.setAttribute('aria-describedby', helpId);
                }
            });

            // Mejorar validación de formularios
            form.addEventListener('submit', (e) => {
                const firstInvalidField = form.querySelector(':invalid');
                if (firstInvalidField) {
                    e.preventDefault();
                    firstInvalidField.focus();
                    this.announceError('Por favor, corrige los errores en el formulario');
                }
            });
        });
    }

    /**
     * Mejora la accesibilidad del video
     */
    enhanceVideoAccessibility() {
        const videos = document.querySelectorAll('video');
        
        videos.forEach(video => {
            // Añadir controles de teclado
            video.setAttribute('tabindex', '0');
            
            // Controles de teclado para video
            video.addEventListener('keydown', (e) => {
                switch(e.key) {
                    case ' ':
                    case 'k':
                        e.preventDefault();
                        video.paused ? video.play() : video.pause();
                        break;
                    case 'm':
                        e.preventDefault();
                        video.muted = !video.muted;
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        video.currentTime -= 10;
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        video.currentTime += 10;
                        break;
                }
            });

            // Anunciar estado del video
            video.addEventListener('play', () => {
                this.announceChange('Video iniciado', true);
            });

            video.addEventListener('pause', () => {
                this.announceChange('Video pausado', true);
            });
        });
    }

    /**
     * Configura soporte para lectores de pantalla
     */
    setupScreenReaderSupport() {
        // Añadir región de anuncios en vivo
        const liveRegion = document.createElement('div');
        liveRegion.id = 'live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);

        // Mejorar semántica de la página
        this.enhancePageSemantics();

        // Añadir landmarks si faltan
        this.addMissingLandmarks();
    }

    /**
     * Mejora la semántica de la página
     */
    enhancePageSemantics() {
        // Asegurar que hay un h1 en cada página
        if (!document.querySelector('h1')) {
            const firstHeading = document.querySelector('h2, h3, h4, h5, h6');
            if (firstHeading) {
                firstHeading.tagName = 'h1';
            }
        }

        // Añadir roles ARIA donde falten
        const nav = document.querySelector('nav:not([role])');
        if (nav) nav.setAttribute('role', 'navigation');

        const main = document.querySelector('main:not([role])');
        if (main) main.setAttribute('role', 'main');

        const footer = document.querySelector('footer:not([role])');
        if (footer) footer.setAttribute('role', 'contentinfo');
    }

    /**
     * Añade landmarks que puedan faltar
     */
    addMissingLandmarks() {
        if (!document.querySelector('main')) {
            const content = document.querySelector('.contenido, .hero, #content');
            if (content && !content.closest('main')) {
                const main = document.createElement('main');
                content.parentNode.insertBefore(main, content);
                main.appendChild(content);
            }
        }
    }

    /**
     * Muestra la ayuda de teclado
     */
    showKeyboardHelp() {
        const helpModal = this.createKeyboardHelpModal();
        document.body.appendChild(helpModal);
        
        // Enfocar el modal
        const closeButton = helpModal.querySelector('.close-help');
        if (closeButton) closeButton.focus();

        // Trap focus dentro del modal
        this.trapFocus(helpModal);
    }

    /**
     * Crea el modal de ayuda de teclado
     */
    createKeyboardHelpModal() {
        const modal = document.createElement('div');
        modal.className = 'keyboard-help-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', 'keyboard-help-title');
        modal.setAttribute('aria-modal', 'true');
        
        modal.innerHTML = `
            <div class="keyboard-help-content">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 id="keyboard-help-title">Atajos de Teclado</h2>
                    <button class="close-help" aria-label="Cerrar ayuda">✕</button>
                </div>
                
                <div class="keyboard-shortcuts">
                    <h3>Navegación General</h3>
                    <div class="shortcut-group">
                        <div class="keyboard-shortcut">
                            <span>Ir al contenido principal</span>
                            <kbd class="shortcut-key">Alt + 1</kbd>
                        </div>
                        <div class="keyboard-shortcut">
                            <span>Ir a la navegación</span>
                            <kbd class="shortcut-key">Alt + 2</kbd>
                        </div>
                        <div class="keyboard-shortcut">
                            <span>Ir al buscador</span>
                            <kbd class="shortcut-key">Alt + 3</kbd>
                        </div>
                        <div class="keyboard-shortcut">
                            <span>Cerrar elementos abiertos</span>
                            <kbd class="shortcut-key">Escape</kbd>
                        </div>
                    </div>

                    <h3>Control de Video</h3>
                    <div class="shortcut-group">
                        <div class="keyboard-shortcut">
                            <span>Reproducir/Pausar</span>
                            <kbd class="shortcut-key">Espacio</kbd>
                        </div>
                        <div class="keyboard-shortcut">
                            <span>Silenciar/Activar sonido</span>
                            <kbd class="shortcut-key">M</kbd>
                        </div>
                        <div class="keyboard-shortcut">
                            <span>Retroceder 10 segundos</span>
                            <kbd class="shortcut-key">←</kbd>
                        </div>
                        <div class="keyboard-shortcut">
                            <span>Avanzar 10 segundos</span>
                            <kbd class="shortcut-key">→</kbd>
                        </div>
                    </div>

                    <h3>Navegación por Tab</h3>
                    <div class="shortcut-group">
                        <div class="keyboard-shortcut">
                            <span>Siguiente elemento</span>
                            <kbd class="shortcut-key">Tab</kbd>
                        </div>
                        <div class="keyboard-shortcut">
                            <span>Elemento anterior</span>
                            <kbd class="shortcut-key">Shift + Tab</kbd>
                        </div>
                        <div class="keyboard-shortcut">
                            <span>Activar elemento enfocado</span>
                            <kbd class="shortcut-key">Enter / Espacio</kbd>
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                    <p><strong>Tip:</strong> Usa Tab para navegar entre elementos interactivos. Los elementos enfocados tendrán un borde azul visible.</p>
                </div>
            </div>
        `;

        // Event listeners para cerrar el modal
        const closeButton = modal.querySelector('.close-help');
        closeButton.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });

        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                document.body.removeChild(modal);
                document.removeEventListener('keydown', closeOnEscape);
            }
        });

        return modal;
    }

    /**
     * Trap focus dentro de un elemento
     */
    trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    }

    /**
     * Cierra elementos abiertos (menús, modals, etc.)
     */
    closeOpenElements() {
        // Cerrar menú de accesibilidad
        const accessibilityMenu = document.getElementById('accessibility-menu');
        if (accessibilityMenu && !accessibilityMenu.hidden) {
            accessibilityMenu.hidden = true;
            document.getElementById('accessibility-toggle').setAttribute('aria-expanded', 'false');
        }

        // Cerrar modales
        const modals = document.querySelectorAll('.keyboard-help-modal');
        modals.forEach(modal => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        });
    }

    /**
     * Anuncia cambios a lectores de pantalla
     */
    announceChange(feature, isEnabled) {
        const message = `${feature} ${isEnabled ? 'activado' : 'desactivado'}`;
        this.announce(message);
    }

    /**
     * Anuncia errores a lectores de pantalla
     */
    announceError(message) {
        this.announce(message, 'assertive');
    }

    /**
     * Método general para anunciar mensajes
     */
    announce(message, priority = 'polite') {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.setAttribute('aria-live', priority);
            liveRegion.textContent = message;
            
            // Limpiar después de un tiempo
            setTimeout(() => {
                liveRegion.textContent = '';
                liveRegion.setAttribute('aria-live', 'polite');
            }, 1000);
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    window.accessibilityFeatures = new AccessibilityFeatures();
});

// Exportar para uso en otros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AccessibilityFeatures;
}