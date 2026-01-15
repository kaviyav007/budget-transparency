// ====== GITHUB PAGES FIX ======
// Add this to your existing HTML file or create a new fix.js file

document.addEventListener('DOMContentLoaded', function() {
    console.log('GitHub Pages Navigation Fix loaded');
    
    // 1. FIX ALL NAVIGATION LINKS
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const targetId = href.substring(1);
            
            console.log('Navigating to:', targetId);
            
            // Special handling for admin link
            if (targetId === 'admin') {
                // Check if user is admin (you need to define isAdmin variable)
                if (typeof isAdmin !== 'undefined' && isAdmin) {
                    document.getElementById('adminDashboard').style.display = 'block';
                    scrollToSection('vote');
                }
                return;
            }
            
            // Scroll to section
            scrollToSection(targetId);
        });
    });
    
    // 2. FIX LANGUAGE SELECTOR
    const langSelect = document.getElementById('languageSelect');
    if (langSelect) {
        langSelect.addEventListener('change', function() {
            if (typeof changeLanguage === 'function') {
                changeLanguage();
            }
        });
    }
    
    // 3. FIX ACCORDION
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            content.classList.toggle('active');
            this.querySelector('span:last-child').textContent = 
                content.classList.contains('active') ? '−' : '+';
        });
    });
    
    // 4. FIX ALL BUTTONS AND INTERACTIVE ELEMENTS
    const interactiveElements = [
        'button', 'select', 'input[type="checkbox"]', 
        'input[type="range"]', '.accordion-header'
    ];
    
    interactiveElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.style.cursor = 'pointer';
        });
    });
    
    console.log('All navigation fixed!');
});

// SIMPLE SCROLL FUNCTION
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        // Simple scroll with offset for header
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
            top: y,
            behavior: 'smooth'
        });
    }
}

// ====== EMERGENCY OVERRIDES ======
// If nothing else works, add these
if (typeof window.originalScroll === 'undefined') {
    window.originalScroll = window.scrollToSection;
    window.scrollToSection = function(sectionId) {
        console.log('Emergency scroll to:', sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
}
