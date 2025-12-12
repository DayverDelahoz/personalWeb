/**
 * Inicializador automático de i18n
 * Detecta elementos que necesitan traducciones y los actualiza automáticamente
 */

class AutoI18nInitializer {
    constructor() {
        this.init();
    }

    init() {
        // Esperar a que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.autoAddI18nAttributes());
        } else {
            this.autoAddI18nAttributes();
        }
    }

    /**
     * Añade automáticamente atributos i18n a elementos que los necesitan
     */
    autoAddI18nAttributes() {
        // Mapeo de selectores a claves de traducción
        const autoMappings = {
            // Navegación
            'nav a[href="index.html"]': 'nav.inicio',
            'nav a[href="sobre-mi.html"]': 'nav.sobre-mi', 
            'nav a[href="proyectos.html"]': 'nav.proyectos',
            'nav a[href="aficiones.html"]': 'nav.aficiones',
            'nav a[href="contacto.html"]': 'nav.contacto',

            // Breadcrumbs
            '.breadcrumb a[href="index.html"]': 'breadcrumb.home',

            // Elementos comunes
            '.skip-link': 'a11y.skip-link',
            'nav[role="navigation"]': 'a11y.main-nav',
            '.breadcrumb': 'a11y.breadcrumb',

            // Búsqueda
            '#site-search': 'search.placeholder',

            // Footer
            '.footer-content p:first-child': 'footer.copyright',
            '.last-updated': 'footer.last-updated'
        };

        // Aplicar mapeos automáticos
        Object.entries(autoMappings).forEach(([selector, i18nKey]) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (!element.hasAttribute('data-i18n') && 
                    !element.hasAttribute('data-i18n-placeholder') && 
                    !element.hasAttribute('data-i18n-aria')) {
                    
                    // Determinar qué tipo de atributo aplicar
                    if (selector.includes('#site-search')) {
                        element.setAttribute('data-i18n-placeholder', i18nKey);
                    } else if (selector.includes('nav[role') || selector.includes('.breadcrumb')) {
                        element.setAttribute('data-i18n-aria', i18nKey);
                    } else {
                        element.setAttribute('data-i18n', i18nKey);
                    }
                }
            });
        });

        // Detectar patrones específicos por página
        this.addPageSpecificI18n();

        // Actualizar botón de idioma si existe
        this.updateLanguageToggle();
    }

    /**
     * Añade atributos i18n específicos según la página actual
     */
    addPageSpecificI18n() {
        const currentPage = this.getCurrentPage();
        
        switch(currentPage) {
            case 'index':
                this.addHomePageI18n();
                break;
            case 'sobre-mi':
                this.addAboutPageI18n();
                break;
            case 'proyectos':
                this.addProjectsPageI18n();
                break;
            case 'aficiones':
                this.addHobbiesPageI18n();
                break;
            case 'contacto':
                this.addContactPageI18n();
                break;
        }
    }

    /**
     * i18n específico para página de inicio
     */
    addHomePageI18n() {
        // Hero section
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle && !heroTitle.hasAttribute('data-i18n')) {
            heroTitle.setAttribute('data-i18n', 'hero.title');
        }

        const heroSubtitle = document.querySelector('.subtitulo');
        if (heroSubtitle && !heroSubtitle.hasAttribute('data-i18n')) {
            heroSubtitle.setAttribute('data-i18n', 'hero.subtitle');
        }

        const heroDescription = document.querySelector('.descripcion');
        if (heroDescription && !heroDescription.hasAttribute('data-i18n')) {
            heroDescription.setAttribute('data-i18n', 'hero.description');
        }

        // Quick contact
        const connectTitle = document.querySelector('.quick-contact h2');
        if (connectTitle && !connectTitle.hasAttribute('data-i18n')) {
            connectTitle.setAttribute('data-i18n', 'hero.connect');
        }

        // Skills section
        const skillsTitle = document.querySelector('.featured-skills h2');
        if (skillsTitle && !skillsTitle.hasAttribute('data-i18n')) {
            skillsTitle.setAttribute('data-i18n', 'skills.main-tech');
        }

        // Search section
        const searchTitle = document.querySelector('.search-section h2');
        if (searchTitle && !searchTitle.hasAttribute('data-i18n')) {
            searchTitle.setAttribute('data-i18n', 'search.title');
        }
    }

    /**
     * i18n específico para página sobre mí
     */
    addAboutPageI18n() {
        const mainTitle = document.querySelector('.contenido h1');
        if (mainTitle && !mainTitle.hasAttribute('data-i18n')) {
            mainTitle.setAttribute('data-i18n', 'about.title');
        }
    }

    /**
     * i18n específico para página de proyectos
     */
    addProjectsPageI18n() {
        const mainTitle = document.querySelector('.contenido h1');
        if (mainTitle && !mainTitle.hasAttribute('data-i18n')) {
            mainTitle.setAttribute('data-i18n', 'projects.title');
        }
    }

    /**
     * i18n específico para página de aficiones
     */
    addHobbiesPageI18n() {
        const mainTitle = document.querySelector('.contenido h1');
        if (mainTitle && !mainTitle.hasAttribute('data-i18n')) {
            mainTitle.setAttribute('data-i18n', 'hobbies.title');
        }
    }

    /**
     * i18n específico para página de contacto
     */
    addContactPageI18n() {
        const mainTitle = document.querySelector('.contenido h1');
        if (mainTitle && !mainTitle.hasAttribute('data-i18n')) {
            mainTitle.setAttribute('data-i18n', 'contact.title');
        }

        // Formulario de contacto
        const formLabels = document.querySelectorAll('.contact-form label');
        const labelKeys = ['contact.form.name', 'contact.form.email', 'contact.form.subject', 'contact.form.message'];
        
        formLabels.forEach((label, index) => {
            if (labelKeys[index] && !label.hasAttribute('data-i18n')) {
                label.setAttribute('data-i18n', labelKeys[index]);
            }
        });

        const submitButton = document.querySelector('.submit-btn');
        if (submitButton && !submitButton.hasAttribute('data-i18n')) {
            submitButton.setAttribute('data-i18n', 'contact.form.submit');
        }
    }

    /**
     * Actualiza el botón de cambio de idioma
     */
    updateLanguageToggle() {
        const langButton = document.querySelector('.language-toggle button');
        if (langButton && !langButton.hasAttribute('data-i18n-aria')) {
            langButton.setAttribute('data-i18n-aria', 'lang.toggle');
        }
    }

    /**
     * Obtiene la página actual
     */
    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        return filename.replace('.html', '') || 'index';
    }

    /**
     * Método para forzar actualización de traducciones
     */
    forceUpdateTranslations() {
        if (window.i18n) {
            window.i18n.applyTranslations();
        }
    }
}

// Crear instancia global
window.autoI18n = new AutoI18nInitializer();

// Función de utilidad para otros scripts
function ensureI18nAttributes() {
    if (window.autoI18n) {
        window.autoI18n.autoAddI18nAttributes();
        window.autoI18n.forceUpdateTranslations();
    }
}

// Auto-ejecutar cuando se añaden nuevos elementos al DOM
if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver((mutations) => {
        let shouldUpdate = false;
        
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Check if any added nodes need i18n
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const hasTextContent = node.textContent && node.textContent.trim();
                        const isInteractiveElement = node.matches('a, button, label, input, h1, h2, h3, h4, h5, h6, p');
                        
                        if (hasTextContent && isInteractiveElement && 
                            !node.hasAttribute('data-i18n') && 
                            !node.hasAttribute('data-i18n-placeholder') && 
                            !node.hasAttribute('data-i18n-aria')) {
                            shouldUpdate = true;
                        }
                    }
                });
            }
        });
        
        if (shouldUpdate) {
            // Debounce updates
            clearTimeout(window.i18nUpdateTimeout);
            window.i18nUpdateTimeout = setTimeout(() => {
                ensureI18nAttributes();
            }, 100);
        }
    });

    // Observar cambios en el DOM
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Export para otros módulos si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AutoI18nInitializer;
}