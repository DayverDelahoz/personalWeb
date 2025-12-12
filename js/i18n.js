/**
 * Sistema de Internacionalización (i18n)
 * Soporte para español e inglés
 */

class Internationalization {
    constructor() {
        this.currentLanguage = 'es';
        this.supportedLanguages = ['es', 'en'];
        this.translations = {};
        this.init();
    }

    /**
     * Inicializa el sistema de i18n
     */
    init() {
        this.loadTranslations();
        this.detectLanguage();
        this.setupLanguageToggle();
    }

    /**
     * Carga las traducciones
     */
    loadTranslations() {
        this.translations = {
            es: {
                // Navegación
                'nav.inicio': 'Inicio',
                'nav.sobre-mi': 'Sobre Mí',
                'nav.proyectos': 'Proyectos',
                'nav.aficiones': 'Aficiones',
                'nav.contacto': 'Contacto',

                // Página principal
                'hero.title': 'Dayver David De la hoz Torregrosa',
                'hero.subtitle': 'Desarrollador | Arquitecto de Software | Especialista en AWS',
                'hero.description': 'Con más de 12 años de experiencia en desarrollo y soporte de aplicaciones, bases de datos relacionales, microservicios y servicios AWS en Exdesis.',
                'hero.connect': 'Conecta conmigo',

                // Búsqueda
                'search.title': 'Buscar en mi portfolio',
                'search.placeholder': 'Buscar proyectos, habilidades, experiencia...',
                'search.button': 'Ejecutar búsqueda',
                'search.no-results': 'No se encontraron resultados para',
                'search.suggestions': 'Sugerencias:',
                'search.verify-spelling': 'Verifica la ortografía',
                'search.try-general': 'Intenta con términos más generales',
                'search.try-keywords': 'Prueba palabras clave como: "AWS", "proyectos", "experiencia", "contacto"',
                'search.results-for': 'Resultados de búsqueda para',

                // Skills
                'skills.main-tech': 'Tecnologías Principales',
                'skills.aws-cloud': 'AWS Cloud',
                'skills.microservices': 'Microservicios',
                'skills.databases': 'Bases de Datos',
                'skills.devops': 'DevOps',

                // Breadcrumb
                'breadcrumb.home': 'Inicio',
                'breadcrumb.about': 'Sobre Mí',
                'breadcrumb.projects': 'Proyectos',
                'breadcrumb.hobbies': 'Aficiones',
                'breadcrumb.contact': 'Contacto',

                // Sobre mí
                'about.who-am-i': '¿Quién soy?',
                'about.professional-experience': 'Experiencia Profesional',
                'about.education': 'Formación Académica',
                'about.technical-skills': 'Habilidades Técnicas',
                'about.certifications': 'Certificaciones y Reconocimientos',
                'about.philosophy': 'Filosofía Profesional',
                'about.continuous-learning': 'Aprendizaje y Desarrollo Continuo',
                'about.why-work-with-me': '¿Por qué trabajar conmigo?',

                // Proyectos
                'projects.title': 'Mis Proyectos',
                'projects.intro': 'Una selección de proyectos que demuestran mi experiencia en arquitecturas modernas, transformación digital y soluciones escalables.',
                'projects.completed': 'Completado',
                'projects.ongoing': 'En Desarrollo',
                'projects.challenge': 'Desafío:',
                'projects.solution': 'Solución Implementada',
                'projects.results': 'Resultados Obtenidos',
                'projects.tech-stack': 'Stack Tecnológico',
                'projects.lessons': 'Lecciones Aprendidas',

                // Aficiones
                'hobbies.title': 'Mis Aficiones e Intereses',
                'hobbies.intro': 'Más allá del código y la tecnología, tengo pasiones que enriquecen mi perspectiva profesional y personal.',
                'hobbies.technology': 'Tecnología y Open Source',
                'hobbies.reading': 'Lectura y Aprendizaje Continuo',
                'hobbies.sports': 'Deporte y Vida Activa',
                'hobbies.music': 'Música y Audio',
                'hobbies.personal-development': 'Desarrollo Personal y Mindfulness',
                'hobbies.gaming': 'Gaming y Tecnología Interactiva',
                'hobbies.influence': '¿Cómo influyen mis aficiones en mi trabajo?',

                // Contacto
                'contact.title': 'Contacto',
                'contact.lets-talk': '¿Hablamos?',
                'contact.intro': 'Si tienes alguna consulta técnica, propuesta de proyecto o quieres colaborar en soluciones tecnológicas, no dudes en contactarme.',
                'contact.information': 'Información de contacto',
                'contact.location': 'Ubicación',
                'contact.form': 'Formulario de contacto',
                'contact.response-time': 'Tiempo de respuesta',
                'contact.email-main': 'Email Principal',
                'contact.company': 'Empresa',
                'contact.form.name': 'Nombre completo',
                'contact.form.email': 'Email',
                'contact.form.subject': 'Asunto',
                'contact.form.message': 'Mensaje',
                'contact.form.submit': 'Enviar mensaje',
                'contact.form.name-help': 'Tu nombre y apellidos',
                'contact.form.email-help': 'Tu dirección de email para responder',
                'contact.form.message-help': 'Describe tu consulta o propuesta',

                // Footer
                'footer.copyright': 'Todos los derechos reservados.',
                'footer.last-updated': 'Última actualización:',
                'footer.navigation': 'Navegación',
                'footer.contact': 'Contacto',
                'footer.location': 'Oviedo, Asturias',
                'footer.expertise': 'Especialidades',
                'footer.about': 'Acerca de',
                'footer.about-text': 'Desarrollador con 12+ años de experiencia en Exdesis. Estudiante de Máster en Ingeniería Web (Universidad de Oviedo).',
                'footer.rights': 'Todos los derechos reservados.',
                'footer.accessibility': 'Accesibilidad',
                'footer.language': 'Idioma',

                // Contacto y redes sociales
                'contact.email': 'Email',
                'contact.email-aria': 'Enviar email',
                'contact.linkedin-aria': 'Ver perfil de LinkedIn (se abre en nueva ventana)',
                'contact.github-aria': 'Ver repositorios de GitHub (se abre en nueva ventana)',

                // Idioma
                'lang.toggle': 'Cambiar idioma',

                // Breadcrumb específicos
                'breadcrumb.home-page': 'Página Principal',

                // Video
                'hero.video-aria': 'Video de presentación profesional de Dayver De La Hoz',
                'hero.video-fallback': 'Tu navegador no soporta el elemento video.',
                'hero.video-download': 'Descargar video',

                // Búsqueda mejorada
                'search.input-aria': 'Buscar contenido del sitio',
                'search.button-aria': 'Ejecutar búsqueda',

                // Accesibilidad
                'a11y.skip-link': 'Saltar al contenido principal',
                'a11y.main-nav': 'Navegación principal',
                'a11y.breadcrumb': 'breadcrumb',
                'a11y.current-page': 'página actual',
                'a11y.external-link': 'se abre en nueva ventana',
                'a11y.search-live': 'Región de resultados de búsqueda',

                // Contacto y redes sociales
                'contact.email': 'Email',
                'contact.email-aria': 'Enviar email',
                'contact.linkedin-aria': 'Ver perfil de LinkedIn (se abre en nueva ventana)',
                'contact.github-aria': 'Ver repositorios de GitHub (se abre en nueva ventana)',

                // Idioma
                'lang.toggle': 'Cambiar idioma',

                // Breadcrumb específicos
                'breadcrumb.home-page': 'Página Principal',

                // Video
                'hero.video-aria': 'Video de presentación profesional de Dayver De La Hoz',
                'hero.video-fallback': 'Tu navegador no soporta el elemento video.',
                'hero.video-download': 'Descargar video',

                // Búsqueda mejorada
                'search.input-aria': 'Buscar contenido del sitio',
                'search.button-aria': 'Ejecutar búsqueda',
            },

            en: {
                // Navigation
                'nav.inicio': 'Home',
                'nav.sobre-mi': 'About Me',
                'nav.proyectos': 'Projects',
                'nav.aficiones': 'Hobbies',
                'nav.contacto': 'Contact',

                // Home page
                'hero.title': 'Dayver David De la hoz Torregrosa',
                'hero.subtitle': 'Developer | Software Architect | AWS Specialist',
                'hero.description': 'With over 12 years of experience in application development and support, relational databases, microservices, and AWS services at Exdesis.',
                'hero.connect': 'Connect with me',

                // Search
                'search.title': 'Search my portfolio',
                'search.placeholder': 'Search projects, skills, experience...',
                'search.button': 'Execute search',
                'search.no-results': 'No results found for',
                'search.suggestions': 'Suggestions:',
                'search.verify-spelling': 'Check the spelling',
                'search.try-general': 'Try more general terms',
                'search.try-keywords': 'Try keywords like: "AWS", "projects", "experience", "contact"',
                'search.results-for': 'Search results for',

                // Skills
                'skills.main-tech': 'Main Technologies',
                'skills.aws-cloud': 'AWS Cloud',
                'skills.microservices': 'Microservices',
                'skills.databases': 'Databases',
                'skills.devops': 'DevOps',

                // Breadcrumb
                'breadcrumb.home': 'Home',
                'breadcrumb.about': 'About Me',
                'breadcrumb.projects': 'Projects',
                'breadcrumb.hobbies': 'Hobbies',
                'breadcrumb.contact': 'Contact',

                // About me
                'about.who-am-i': 'Who am I?',
                'about.professional-experience': 'Professional Experience',
                'about.education': 'Education',
                'about.technical-skills': 'Technical Skills',
                'about.certifications': 'Certifications and Recognition',
                'about.philosophy': 'Professional Philosophy',
                'about.continuous-learning': 'Continuous Learning and Development',
                'about.why-work-with-me': 'Why work with me?',

                // Projects
                'projects.title': 'My Projects',
                'projects.intro': 'A selection of projects demonstrating my experience in modern architectures, digital transformation, and scalable solutions.',
                'projects.completed': 'Completed',
                'projects.ongoing': 'In Development',
                'projects.challenge': 'Challenge:',
                'projects.solution': 'Implemented Solution',
                'projects.results': 'Results Obtained',
                'projects.tech-stack': 'Tech Stack',
                'projects.lessons': 'Lessons Learned',

                // Hobbies
                'hobbies.title': 'My Hobbies and Interests',
                'hobbies.intro': 'Beyond code and technology, I have passions that enrich my professional and personal perspective.',
                'hobbies.technology': 'Technology and Open Source',
                'hobbies.reading': 'Reading and Continuous Learning',
                'hobbies.sports': 'Sports and Active Life',
                'hobbies.music': 'Music and Audio',
                'hobbies.personal-development': 'Personal Development and Mindfulness',
                'hobbies.gaming': 'Gaming and Interactive Technology',
                'hobbies.influence': 'How do my hobbies influence my work?',

                // Contact
                'contact.title': 'Contact',
                'contact.lets-talk': 'Let\'s talk?',
                'contact.intro': 'If you have any technical queries, project proposals, or want to collaborate on technological solutions, don\'t hesitate to contact me.',
                'contact.information': 'Contact information',
                'contact.location': 'Location',
                'contact.form': 'Contact form',
                'contact.response-time': 'Response time',
                'contact.email-main': 'Main Email',
                'contact.company': 'Company',
                'contact.form.name': 'Full name',
                'contact.form.email': 'Email',
                'contact.form.subject': 'Subject',
                'contact.form.message': 'Message',
                'contact.form.submit': 'Send message',
                'contact.form.name-help': 'Your name and surname',
                'contact.form.email-help': 'Your email address for response',
                'contact.form.message-help': 'Describe your query or proposal',

                // Footer
                'footer.copyright': 'All rights reserved.',
                'footer.last-updated': 'Last updated:',
                'footer.navigation': 'Navigation',
                'footer.contact': 'Contact',
                'footer.location': 'Oviedo, Asturias',
                'footer.expertise': 'Expertise',
                'footer.about': 'About',
                'footer.about-text': 'Developer with 12+ years of experience at Exdesis. Master\'s student in Web Engineering (University of Oviedo).',
                'footer.rights': 'All rights reserved.',
                'footer.accessibility': 'Accessibility',
                'footer.language': 'Language',

                // Contact and social media
                'contact.email': 'Email',
                'contact.email-aria': 'Send email',
                'contact.linkedin-aria': 'View LinkedIn profile (opens in new window)',
                'contact.github-aria': 'View GitHub repositories (opens in new window)',

                // Language
                'lang.toggle': 'Switch language',

                // Breadcrumb specific
                'breadcrumb.home-page': 'Home Page',

                // Video
                'hero.video-aria': 'Professional presentation video of Dayver De La Hoz',
                'hero.video-fallback': 'Your browser does not support the video element.',
                'hero.video-download': 'Download video',

                // Search enhanced
                'search.input-aria': 'Search site content',
                'search.button-aria': 'Execute search',

                // Accessibility
                'a11y.skip-link': 'Skip to main content',
                'a11y.main-nav': 'Main navigation',
                'a11y.breadcrumb': 'breadcrumb',
                'a11y.current-page': 'current page',
                'a11y.external-link': 'opens in new window',
                'a11y.search-live': 'Search results region',

                // Contact and social media
                'contact.email': 'Email',
                'contact.email-aria': 'Send email',
                'contact.linkedin-aria': 'View LinkedIn profile (opens in new window)',
                'contact.github-aria': 'View GitHub repositories (opens in new window)',

                // Language
                'lang.toggle': 'Switch language',

                // Breadcrumb specific
                'breadcrumb.home-page': 'Home Page',

                // Video
                'hero.video-aria': 'Professional presentation video of Dayver De La Hoz',
                'hero.video-fallback': 'Your browser does not support the video element.',
                'hero.video-download': 'Download video',

                // Search enhanced
                'search.input-aria': 'Search site content',
                'search.button-aria': 'Execute search',

                // Content types
                'type.page': 'page',
                'type.project': 'project',
                'type.skill': 'skill',
                'type.experience': 'experience',
                'type.education': 'education',
                'type.certification': 'certification',
                'type.hobby': 'hobby',
                'type.contact': 'contact'
            }
        };
    }

    /**
     * Detecta el idioma del usuario
     */
    detectLanguage() {
        // Buscar en localStorage
        const savedLang = localStorage.getItem('preferred-language');
        if (savedLang && this.supportedLanguages.includes(savedLang)) {
            this.currentLanguage = savedLang;
            return;
        }

        // Detectar desde el navegador
        const browserLang = navigator.language.substr(0, 2);
        if (this.supportedLanguages.includes(browserLang)) {
            this.currentLanguage = browserLang;
        } else {
            this.currentLanguage = 'es'; // Español por defecto
        }

        this.saveLanguagePreference();
    }

    /**
     * Configura el toggle de idioma
     */
    setupLanguageToggle() {
        // Configurar botón flotante
        const floatingButton = document.getElementById('language-toggle-btn');
        if (floatingButton) {
            this.updateLanguageButton(floatingButton);
            floatingButton.addEventListener('click', () => {
                this.toggleLanguage();
            });
        }

        // Configurar botón del footer (si existe)
        const footerButton = document.querySelector('.footer-links a[onclick*="toggleLanguage"]');
        if (footerButton) {
            footerButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleLanguage();
            });
        }

        // También buscar por cualquier botón con clase language-toggle
        const allToggleButtons = document.querySelectorAll('.language-toggle button');
        allToggleButtons.forEach(button => {
            if (!button.id || button.id !== 'language-toggle-btn') {
                this.updateLanguageButton(button);
                button.addEventListener('click', () => {
                    this.toggleLanguage();
                });
            }
        });

        // Aplicar traducciones iniciales
        this.applyTranslations();
        this.updatePageLanguage();
    }

    /**
     * Cambia entre idiomas
     */
    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'es' ? 'en' : 'es';
        this.saveLanguagePreference();
        this.applyTranslations();
        this.updatePageLanguage();
        this.updateLanguageButton();
        this.announceLanguageChange();
    }

    /**
     * Obtiene una traducción
     */
    t(key, fallback = null) {
        const translation = this.translations[this.currentLanguage]?.[key] || 
                           this.translations['es']?.[key] || 
                           fallback || 
                           key;
        return translation;
    }

    /**
     * Aplica las traducciones a elementos marcados
     */
    applyTranslations() {
        // Traducir elementos con data-i18n
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = this.t(key);
        });

        // Traducir placeholders
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });

        // Traducir aria-labels
        const ariaLabelElements = document.querySelectorAll('[data-i18n-aria]');
        ariaLabelElements.forEach(element => {
            const key = element.getAttribute('data-i18n-aria');
            element.setAttribute('aria-label', this.t(key));
        });

        // Traducir títulos
        const titleElements = document.querySelectorAll('[data-i18n-title]');
        titleElements.forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = this.t(key);
        });

        // Actualizar contenido específico por página
        this.updatePageSpecificContent();
    }

    /**
     * Actualiza contenido específico de cada página
     */
    updatePageSpecificContent() {
        const currentPage = this.getCurrentPage();
        
        switch(currentPage) {
            case 'index':
                this.translateHomePage();
                break;
            case 'sobre-mi':
                this.translateAboutPage();
                break;
            case 'proyectos':
                this.translateProjectsPage();
                break;
            case 'aficiones':
                this.translateHobbiesPage();
                break;
            case 'contacto':
                this.translateContactPage();
                break;
        }
    }

    /**
     * Traduce la página de inicio
     */
    translateHomePage() {
        const elements = {
            'h1': this.t('hero.title'),
            '.subtitulo': this.t('hero.subtitle'),
            '.descripcion': this.t('hero.description'),
            '.quick-contact h2': this.t('hero.connect'),
            '.search-section h2': this.t('search.title'),
            '.featured-skills h2': this.t('skills.main-tech')
        };

        this.updateElements(elements);

        // Actualizar skills cards
        const skillCards = document.querySelectorAll('.skill-card h3');
        if (skillCards.length >= 4) {
            skillCards[0].innerHTML = `☁️ ${this.t('skills.aws-cloud')}`;
            skillCards[1].innerHTML = `🏗️ ${this.t('skills.microservices')}`;
            skillCards[2].innerHTML = `🗃️ ${this.t('skills.databases')}`;
            skillCards[3].innerHTML = `⚙️ ${this.t('skills.devops')}`;
        }
    }

    /**
     * Traduce la página sobre mí
     */
    translateAboutPage() {
        const headings = {
            'h2': [
                this.t('about.who-am-i'),
                this.t('about.professional-experience'),
                this.t('about.education'),
                this.t('about.technical-skills'),
                this.t('about.certifications'),
                this.t('about.philosophy'),
                this.t('about.continuous-learning'),
                this.t('about.why-work-with-me')
            ]
        };

        // Actualizar encabezados principales
        const h2Elements = document.querySelectorAll('.contenido h2');
        headings.h2.forEach((text, index) => {
            if (h2Elements[index]) {
                h2Elements[index].textContent = text;
            }
        });
    }

    /**
     * Traduce la página de proyectos
     */
    translateProjectsPage() {
        // Actualizar estados de proyecto
        const statusElements = document.querySelectorAll('.project-status');
        statusElements.forEach(element => {
            if (element.classList.contains('completed')) {
                element.textContent = this.t('projects.completed');
            } else if (element.classList.contains('ongoing')) {
                element.textContent = this.t('projects.ongoing');
            }
        });
    }

    /**
     * Traduce la página de aficiones
     */
    translateHobbiesPage() {
        // Traducir títulos de aficiones
        const aficionTitles = {
            'Tecnología y Open Source': this.t('hobbies.technology'),
            'Lectura y Aprendizaje Continuo': this.t('hobbies.reading'),
            'Deporte y Vida Activa': this.t('hobbies.sports'),
            'Música y Audio': this.t('hobbies.music'),
            'Desarrollo Personal y Mindfulness': this.t('hobbies.personal-development'),
            'Gaming y Tecnología Interactiva': this.t('hobbies.gaming')
        };

        const aficionCards = document.querySelectorAll('.aficion-card h2');
        aficionCards.forEach(card => {
            const currentTitle = card.textContent.trim();
            if (aficionTitles[currentTitle]) {
                card.textContent = aficionTitles[currentTitle];
            }
        });
    }

    /**
     * Traduce la página de contacto
     */
    translateContactPage() {
        const contactElements = {
            '.contenido h1': this.t('contact.title'),
            'article h2': [
                this.t('contact.lets-talk'),
                this.t('contact.information'),
                this.t('contact.location'),
                this.t('contact.form'),
                this.t('contact.response-time')
            ]
        };

        // Actualizar formulario
        const formLabels = document.querySelectorAll('.contact-form label');
        const labelTranslations = [
            this.t('contact.form.name'),
            this.t('contact.form.email'),
            this.t('contact.form.subject'),
            this.t('contact.form.message')
        ];

        formLabels.forEach((label, index) => {
            if (labelTranslations[index]) {
                label.textContent = labelTranslations[index];
            }
        });

        const submitButton = document.querySelector('.submit-btn');
        if (submitButton) {
            submitButton.textContent = this.t('contact.form.submit');
        }
    }

    /**
     * Actualiza elementos del DOM con nuevos textos
     */
    updateElements(elements) {
        Object.entries(elements).forEach(([selector, text]) => {
            const element = document.querySelector(selector);
            if (element) {
                element.textContent = text;
            }
        });
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
     * Actualiza el atributo lang de la página
     */
    updatePageLanguage() {
        document.documentElement.lang = this.currentLanguage;
        
        // Actualizar meta tags
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
        }

        // Actualizar description según página e idioma
        const descriptions = {
            'es': {
                'index': 'Dayver David De La Hoz Torregrosa - Desarrollador y Arquitecto de Software con más de 12 años de experiencia en AWS, microservicios y bases de datos.',
                'sobre-mi': 'Conoce más sobre Dayver De La Hoz: experiencia profesional, formación académica, habilidades técnicas y trayectoria en desarrollo de software.',
                'proyectos': 'Descubre los proyectos destacados de Dayver De La Hoz: migración a microservicios, infraestructura AWS, optimización de bases de datos y más.',
                'aficiones': 'Conoce las aficiones e intereses personales de Dayver De La Hoz: tecnología, lectura, deportes, música y desarrollo personal.',
                'contacto': 'Contacta con Dayver De La Hoz para consultas técnicas, propuestas de proyectos o colaboraciones en soluciones tecnológicas.'
            },
            'en': {
                'index': 'Dayver David De La Hoz Torregrosa - Software Developer and Architect with over 12 years of experience in AWS, microservices, and databases.',
                'sobre-mi': 'Learn more about Dayver De La Hoz: professional experience, academic background, technical skills, and software development career.',
                'proyectos': 'Discover Dayver De La Hoz\'s featured projects: microservices migration, AWS infrastructure, database optimization, and more.',
                'aficiones': 'Learn about Dayver De La Hoz\'s personal hobbies and interests: technology, reading, sports, music, and personal development.',
                'contacto': 'Contact Dayver De La Hoz for technical consultations, project proposals, or collaborations on technological solutions.'
            }
        };

        const currentPage = this.getCurrentPage();
        const newDescription = descriptions[this.currentLanguage]?.[currentPage] || descriptions['es']['index'];
        metaDescription.content = newDescription;
    }

    /**
     * Actualiza el botón de cambio de idioma
     */
    updateLanguageButton(button = null) {
        const buttons = [];
        
        if (button) {
            buttons.push(button);
        } else {
            // Buscar todos los botones de idioma
            const floatingButton = document.getElementById('language-toggle-btn');
            const allToggleButtons = document.querySelectorAll('.language-toggle button');
            
            if (floatingButton) buttons.push(floatingButton);
            allToggleButtons.forEach(btn => {
                if (!buttons.includes(btn)) buttons.push(btn);
            });
        }

        buttons.forEach(toggleButton => {
            if (toggleButton) {
                const displayText = this.currentLanguage === 'es' ? '🌐 ES | EN' : '🌐 EN | ES';
                toggleButton.innerHTML = displayText;
                
                const ariaLabel = this.currentLanguage === 'es' ? 
                    'Cambiar a inglés' : 'Switch to Spanish';
                toggleButton.setAttribute('aria-label', ariaLabel);
            }
        });
    }

    /**
     * Guarda la preferencia de idioma
     */
    saveLanguagePreference() {
        localStorage.setItem('preferred-language', this.currentLanguage);
    }

    /**
     * Anuncia el cambio de idioma para accesibilidad
     */
    announceLanguageChange() {
        const message = this.currentLanguage === 'es' ? 
            'Idioma cambiado a español' : 'Language changed to English';
        
        // Crear anuncio para lectores de pantalla
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            if (announcement.parentNode) {
                document.body.removeChild(announcement);
            }
        }, 1000);
    }

    /**
     * Función para actualizar búsquedas con el idioma actual
     */
    updateSearchForLanguage() {
        if (window.siteSearch) {
            // Actualizar términos de búsqueda según idioma
            const searchInput = document.getElementById('site-search');
            if (searchInput && this.currentLanguage === 'en') {
                searchInput.placeholder = this.t('search.placeholder');
            }
        }
    }
}

// Función global para toggle de idioma
function toggleLanguage() {
    if (window.i18n) {
        window.i18n.toggleLanguage();
    } else {
        // Si i18n no está listo, intentar después de un momento
        setTimeout(() => {
            if (window.i18n) {
                window.i18n.toggleLanguage();
            }
        }, 100);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    window.i18n = new Internationalization();
    
    // Configurar event listeners adicionales después de la inicialización
    setTimeout(() => {
        const floatingButton = document.getElementById('language-toggle-btn');
        if (floatingButton && window.i18n) {
            // Remover cualquier event listener existente
            const newButton = floatingButton.cloneNode(true);
            floatingButton.parentNode.replaceChild(newButton, floatingButton);
            
            // Añadir el nuevo event listener
            newButton.addEventListener('click', () => {
                window.i18n.toggleLanguage();
            });
        }
    }, 200);
});

// Exportar para uso en otros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Internationalization;
}