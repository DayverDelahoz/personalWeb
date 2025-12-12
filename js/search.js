/**
 * Buscador Interno del Sitio Web Personal
 * Implementación de búsqueda client-side con indexación y relevancia
 */

class SiteSearch {
    constructor() {
        this.searchIndex = [];
        this.isIndexBuilt = false;
        this.init();
    }

    /**
     * Inicializa el buscador y construye el índice
     */
    init() {
        this.buildSearchIndex();
        this.setupEventListeners();
        this.moveSearchToHeader();
    }
    
    moveSearchToHeader() {
        const searchSection = document.querySelector('.search-section');
        if (searchSection) {
            // Eliminar la sección de búsqueda original
            searchSection.remove();
        }
    }

    buildSearchIndex() {
        // Contenido estático del sitio indexado
        this.searchIndex = [
            // ... (índice existente se mantiene igual)
        ];

        this.isIndexBuilt = true;
    }
    /**
     * Construye un índice de búsqueda con todo el contenido del sitio
     */
    buildSearchIndex() {
        
        // Contenido estático del sitio indexado
        this.searchIndex = [
            // Página principal
            {
                title: "Desarrollador y Arquitecto de Software",
                content: "Dayver David De la hoz Torregrosa desarrollador arquitecto software AWS microservicios bases datos",
                url: "index.html",
                type: "página",
                section: "inicio"
            },
            {
                title: "Experiencia en AWS",
                content: "AWS Lambda EC2 S3 RDS CloudFormation cloud computing servicios web amazon",
                url: "index.html",
                type: "habilidad",
                section: "inicio"
            },
            {
                title: "Microservicios y Docker",
                content: "microservicios docker kubernetes contenedores arquitectura distribuida API REST",
                url: "index.html",
                type: "habilidad",
                section: "inicio"
            },

            // Sobre mí
            {
                title: "Experiencia Profesional - Exdesis",
                content: "Exdesis desarrollador senior arquitecto software 12 años experiencia aplicaciones empresariales",
                url: "sobre-mi.html",
                type: "experiencia",
                section: "sobre-mi"
            },
            {
                title: "Máster en Ingeniería Web",
                content: "Universidad Oviedo máster ingeniería web UX UI accesibilidad usabilidad",
                url: "sobre-mi.html",
                type: "formación",
                section: "sobre-mi"
            },
            {
                title: "Habilidades Técnicas",
                content: "Java Spring Boot Node.js Python Django C# .NET JavaScript TypeScript React Vue",
                url: "sobre-mi.html",
                type: "habilidad",
                section: "sobre-mi"
            },
            {
                title: "Bases de Datos",
                content: "SQL Server PostgreSQL MySQL MongoDB Redis optimización consultas administración",
                url: "sobre-mi.html",
                type: "habilidad",
                section: "sobre-mi"
            },
            {
                title: "Certificaciones AWS",
                content: "AWS Solutions Architect Professional DevOps Engineer SysOps Administrator certificado",
                url: "sobre-mi.html",
                type: "certificación",
                section: "sobre-mi"
            },

            // Proyectos
            {
                title: "Migración a Microservicios",
                content: "migración monolítico microservicios transformación digital arquitectura Domain-Driven Design",
                url: "proyectos.html",
                type: "proyecto",
                section: "proyectos"
            },
            {
                title: "Infraestructura AWS Cloud-Native",
                content: "AWS infraestructura cloud native EC2 Lambda RDS S3 CloudFront auto-scaling",
                url: "proyectos.html",
                type: "proyecto",
                section: "proyectos"
            },
            {
                title: "Optimización Bases de Datos",
                content: "optimización bases datos rendimiento queries índices particionado read replicas caching",
                url: "proyectos.html",
                type: "proyecto",
                section: "proyectos"
            },
            {
                title: "Platform DevOps AI/ML",
                content: "DevOps plataforma inteligente machine learning AI predicción fallos auto-healing",
                url: "proyectos.html",
                type: "proyecto",
                section: "proyectos"
            },

            // Aficiones
            {
                title: "Tecnología y Open Source",
                content: "open source contribuciones GitHub tecnología innovación IA machine learning",
                url: "aficiones.html",
                type: "afición",
                section: "aficiones"
            },
            {
                title: "Lectura Técnica",
                content: "libros técnicos Clean Architecture Phoenix Project Designing Data-Intensive Applications",
                url: "aficiones.html",
                type: "afición",
                section: "aficiones"
            },
            {
                title: "Deporte y Running",
                content: "running senderismo ciclismo natación deporte vida activa ejercicio salud",
                url: "aficiones.html",
                type: "afición",
                section: "aficiones"
            },
            {
                title: "Música y Desarrollo",
                content: "música programación lo-fi jazz electrónica ambient coding playlists",
                url: "aficiones.html",
                type: "afición",
                section: "aficiones"
            },
            {
                title: "Gaming y Tecnología",
                content: "videojuegos gaming Unity Unreal Godot engines desarrollo juegos WebGL",
                url: "aficiones.html",
                type: "afición",
                section: "aficiones"
            },

            // Contacto
            {
                title: "Información de Contacto",
                content: "contacto email LinkedIn GitHub consultas técnicas proyectos colaboración Oviedo",
                url: "contacto.html",
                type: "contacto",
                section: "contacto"
            },
            {
                title: "Formulario de Contacto",
                content: "formulario contacto consultoría técnica propuestas proyectos colaboración empleo",
                url: "contacto.html",
                type: "contacto",
                section: "contacto"
            }
        ];

        this.isIndexBuilt = true;
    }

    /**
     * Configura los event listeners para el formulario de búsqueda
     */
    setupEventListeners() {
        const searchInput = document.getElementById('site-search');
        const searchButton = document.querySelector('.header-search-button');

        if (searchInput) {
            // Búsqueda en tiempo real mientras se escribe
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (query.length >= 2) {
                    this.performSearch(query);
                    this.showResults();
                } else {
                    this.hideResults();
                }
            });

            // Búsqueda al presionar Enter
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const query = searchInput.value.trim();
                    if (query.length >= 2) {
                        this.performSearch(query);
                        this.showResults();
                    }
                }
            });

            // Ocultar resultados al hacer clic fuera
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.header-search-container')) {
                    this.hideResults();
                }
            });
        }

        // Event listener para el botón de búsqueda
        if (searchButton) {
            searchButton.addEventListener('click', (e) => {
                e.preventDefault();
                const query = searchInput ? searchInput.value.trim() : '';
                if (query.length >= 2) {
                    this.performSearch(query);
                    this.showResults();
                }
            });
        }
    }
    
    showResults() {
        const resultsContainer = document.getElementById('search-results');
        if (resultsContainer) {
            resultsContainer.classList.add('show');
        }
    }
    hideResults() {
        const resultsContainer = document.getElementById('search-results');
        if (resultsContainer) {
            resultsContainer.classList.remove('show');
        }
    }

    
    /**
     * Realiza la búsqueda en el índice
     * @param {string} query - Término de búsqueda
     */
    performSearch(query) {
        if (!this.isIndexBuilt) {
            this.buildSearchIndex();
        }

        const results = this.searchInIndex(query);
        this.displayResults(results, query);
        
        // Analítica básica
        this.trackSearch(query, results.length);
    }

    /**
     * Busca en el índice y calcula relevancia
     * @param {string} query - Término de búsqueda
     * @returns {Array} Resultados ordenados por relevancia
     */
    searchInIndex(query) {
        const queryTerms = this.normalizeQuery(query);
        const results = [];

        this.searchIndex.forEach(item => {
            const titleScore = this.calculateRelevanceScore(queryTerms, this.normalizeText(item.title));
            const contentScore = this.calculateRelevanceScore(queryTerms, this.normalizeText(item.content));
            
            const totalScore = (titleScore * 3) + contentScore; // Título tiene más peso
            
            if (totalScore > 0) {
                results.push({
                    ...item,
                    score: totalScore,
                    titleMatch: titleScore > 0,
                    contentMatch: contentScore > 0
                });
            }
        });

        // Ordenar por relevancia (score descendente)
        return results.sort((a, b) => b.score - a.score).slice(0, 8); // Máximo 8 resultados
    }

    /**
     * Normaliza el texto para búsqueda (minúsculas, sin acentos, etc.)
     * @param {string} text - Texto a normalizar
     * @returns {string} Texto normalizado
     */
    normalizeText(text) {
        return text.toLowerCase()
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
                  .replace(/[^\w\s]/g, ' ') // Reemplazar símbolos por espacios
                  .replace(/\s+/g, ' ') // Múltiples espacios por uno solo
                  .trim();
    }

    /**
     * Normaliza la consulta de búsqueda
     * @param {string} query - Consulta de búsqueda
     * @returns {Array} Términos de búsqueda normalizados
     */
    normalizeQuery(query) {
        return this.normalizeText(query)
                  .split(' ')
                  .filter(term => term.length > 1); // Ignorar términos de 1 letra
    }

    /**
     * Calcula el score de relevancia entre términos de búsqueda y texto
     * @param {Array} queryTerms - Términos de búsqueda
     * @param {string} text - Texto donde buscar
     * @returns {number} Score de relevancia
     */
    calculateRelevanceScore(queryTerms, text) {
        let score = 0;
        const words = text.split(' ');

        queryTerms.forEach(term => {
            // Coincidencia exacta
            if (text.includes(term)) {
                score += term.length; // Términos más largos valen más
                
                // Bonus si es una palabra completa
                if (words.includes(term)) {
                    score += term.length * 2;
                }
                
                // Bonus si está al principio del texto
                if (text.startsWith(term)) {
                    score += term.length;
                }
            }
        });

        return score;
    }

    /**
     * Muestra los resultados de búsqueda en el DOM
     * @param {Array} results - Resultados de búsqueda
     * @param {string} query - Consulta original
     */
    displayResults(results, query) {
        const resultsContainer = document.getElementById('search-results');
        if (!resultsContainer) return;

        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <p><strong>No se encontraron resultados para "${query}"</strong></p>
                    <p>Sugerencias:</p>
                    <ul>
                        <li>Verifica la ortografía</li>
                        <li>Intenta con términos más generales</li>
                        <li>Prueba palabras clave como: "AWS", "proyectos", "experiencia", "contacto"</li>
                    </ul>
                </div>
            `;
            return;
        }

        const resultsHTML = `
            <div class="search-results-header">
                <h3>Resultados de búsqueda para "${query}" (${results.length})</h3>
            </div>
            <div class="search-results-list">
                ${results.map(result => this.renderSearchResult(result, query)).join('')}
            </div>
        `;

        resultsContainer.innerHTML = resultsHTML;

        // Mejorar accesibilidad anunciando resultados
        this.announceResults(results.length, query);
    }

    /**
     * Renderiza un resultado individual de búsqueda
     * @param {Object} result - Resultado individual
     * @param {string} query - Consulta original
     * @returns {string} HTML del resultado
     */
    renderSearchResult(result, query) {
        const highlightedTitle = this.highlightMatches(result.title, query);
        const snippet = this.createSnippet(result.content, query);
        
        // Iconos por tipo de contenido
        const typeIcons = {
            'página': '📄',
            'proyecto': '🚀',
            'habilidad': '💻',
            'experiencia': '💼',
            'formación': '🎓',
            'certificación': '🏆',
            'afición': '🎯',
            'contacto': '📞'
        };

        const icon = typeIcons[result.type] || '📄';

        return `
            <div class="search-result-item" data-score="${result.score}">
                <div class="result-header">
                    <span class="result-icon" aria-hidden="true">${icon}</span>
                    <a href="${result.url}" class="result-title">
                        ${highlightedTitle}
                    </a>
                    <span class="result-type">${result.type}</span>
                </div>
                <p class="result-snippet">${snippet}</p>
                <div class="result-meta">
                    <span class="result-section">Sección: ${result.section}</span>
                    <span class="result-score">Relevancia: ${Math.round(result.score)}</span>
                </div>
            </div>
        `;
    }

    /**
     * Resalta las coincidencias en el texto
     * @param {string} text - Texto original
     * @param {string} query - Consulta de búsqueda
     * @returns {string} Texto con coincidencias resaltadas
     */
    highlightMatches(text, query) {
        const queryTerms = this.normalizeQuery(query);
        let highlightedText = text;

        queryTerms.forEach(term => {
            const regex = new RegExp(`(${this.escapeRegex(term)})`, 'gi');
            highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
        });

        return highlightedText;
    }

    /**
     * Crea un snippet del contenido con contexto de las coincidencias
     * @param {string} content - Contenido completo
     * @param {string} query - Consulta de búsqueda
     * @returns {string} Snippet con contexto
     */
    createSnippet(content, query) {
        const queryTerms = this.normalizeQuery(query);
        const normalizedContent = this.normalizeText(content);
        
        // Buscar la primera coincidencia
        let firstMatchIndex = -1;
        queryTerms.forEach(term => {
            const index = normalizedContent.indexOf(term);
            if (index !== -1 && (firstMatchIndex === -1 || index < firstMatchIndex)) {
                firstMatchIndex = index;
            }
        });

        if (firstMatchIndex === -1) {
            return content.substring(0, 150) + '...';
        }

        // Crear snippet alrededor de la coincidencia
        const start = Math.max(0, firstMatchIndex - 50);
        const end = Math.min(content.length, firstMatchIndex + 100);
        
        let snippet = content.substring(start, end);
        if (start > 0) snippet = '...' + snippet;
        if (end < content.length) snippet = snippet + '...';

        return this.highlightMatches(snippet, query);
    }

    /**
     * Escapa caracteres especiales de regex
     * @param {string} string - String a escapar
     * @returns {string} String escapado
     */
    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /**
     * Limpia los resultados de búsqueda
     */
    clearResults() {
        const resultsContainer = document.getElementById('search-results');
        if (resultsContainer) {
            resultsContainer.innerHTML = '';
        }
    }

    /**
     * Anuncia los resultados para lectores de pantalla
     * @param {number} count - Número de resultados
     * @param {string} query - Consulta de búsqueda
     */
    announceResults(count, query) {
        const message = count === 1 
            ? `Se encontró 1 resultado para ${query}`
            : `Se encontraron ${count} resultados para ${query}`;
        
        // Crear elemento para anunciar a lectores de pantalla
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        // Remover después de que se haya anunciado
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    /**
     * Tracking básico de búsquedas (para analytics)
     * @param {string} query - Consulta de búsqueda
     * @param {number} resultCount - Número de resultados
     */
    trackSearch(query, resultCount) {
        // Enviar a analytics si está configurado
        if (typeof gtag !== 'undefined') {
            gtag('event', 'site_search', {
                'search_term': query,
                'result_count': resultCount
            });
        }
        
        // Log para desarrollo
        console.log(`Búsqueda: "${query}" - ${resultCount} resultados`);
    }
}

// Función global para búsqueda (llamada desde el HTML)
function searchSite() {
    const searchInput = document.getElementById('site-search');
    if (searchInput && window.siteSearch) {
        const query = searchInput.value.trim();
        if (query.length >= 2) {
            window.siteSearch.performSearch(query);
            window.siteSearch.showResults();
        }
    }
}

// Inicializar buscador cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    window.siteSearch = new SiteSearch();
});

// Exportar para uso en otros scripts si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SiteSearch;
}