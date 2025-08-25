// Language Switcher for RECYCLEX s.r.o. Website
// Supports English (en) and Slovak (sk) languages

class LanguageSwitcher {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.init();
    }

    init() {
        // Set initial language
        this.setLanguage(this.currentLanguage);
        
        // Add event listeners to language buttons
        document.addEventListener('DOMContentLoaded', () => {
            const langButtons = document.querySelectorAll('.lang-btn');
            langButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const lang = e.target.getAttribute('data-lang');
                    this.setLanguage(lang);
                });
            });
        });
    }

    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Hide all language elements
        const allLangElements = document.querySelectorAll('[data-lang-en], [data-lang-sk]');
        allLangElements.forEach(element => {
            element.style.display = 'none';
        });
        
        // Show elements for current language
        const currentLangElements = document.querySelectorAll(`[data-lang-${lang}]`);
        currentLangElements.forEach(element => {
            element.style.display = element.dataset.display || 'block';
        });
        
        // Update active language button
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
        
        // Update placeholders and values
        this.updateFormElements(lang);
        
        // Update title attributes
        this.updateTitleAttributes(lang);
    }

    updateFormElements(lang) {
        const formElements = document.querySelectorAll('input[data-placeholder-en], select[data-placeholder-en]');
        formElements.forEach(element => {
            const placeholder = element.getAttribute(`data-placeholder-${lang}`);
            if (placeholder) {
                element.placeholder = placeholder;
            }
        });

        // Update submit button values
        const submitButtons = document.querySelectorAll('input[type="submit"][data-value-en]');
        submitButtons.forEach(button => {
            const value = button.getAttribute(`data-value-${lang}`);
            if (value) {
                button.value = value;
            }
        });

        // Update reset button values
        const resetButtons = document.querySelectorAll('input[type="reset"][data-value-en]');
        resetButtons.forEach(button => {
            const value = button.getAttribute(`data-value-${lang}`);
            if (value) {
                button.value = value;
            }
        });
        
        // Update title attributes for elements with data-title-* attributes
        const titleElements = document.querySelectorAll('[data-title-en]');
        titleElements.forEach(element => {
            const title = element.getAttribute(`data-title-${lang}`);
            if (title) {
                element.title = title;
            }
        });
    }
    
    updateTitleAttributes(lang) {
        const titleElements = document.querySelectorAll('[data-title-en]');
        titleElements.forEach(element => {
            const title = element.getAttribute(`data-title-${lang}`);
            if (title) {
                element.title = title;
            }
        });
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }
}

// Initialize language switcher
const languageSwitcher = new LanguageSwitcher();
