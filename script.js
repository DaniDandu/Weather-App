document.addEventListener('DOMContentLoaded', function() {
    // Selectare elemente
    const menuIcon = document.querySelector('.menu-icon');
    const closeMenu = document.querySelector('.close-menu');
    const menuSidebar = document.querySelector('.menu-sidebar');
    const searchIcon = document.querySelector('.search-icon');
    const inputContainer = document.querySelector('.input-container');
    const headerTop = document.querySelector('.header-top');
    const searchBtn = document.querySelector('.search-btn');

    // Funcționalitate meniu
    if(menuIcon) {
        menuIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            menuSidebar.classList.add('active');
        });
    }

    // Închidere meniu
    if(closeMenu) {
        closeMenu.addEventListener('click', () => {
            menuSidebar.classList.remove('active');
        });
    }

    // Funcționalitate search
    if(searchIcon) {
        searchIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            inputContainer.classList.add('active');
            headerTop.style.opacity = '0';
            headerTop.style.pointerEvents = 'none';
        });
    }

    // Închidere search la click în afară
    document.addEventListener('click', (e) => {
        // Închide meniul
        if(!menuSidebar.contains(e.target) && !menuIcon.contains(e.target)) {
            menuSidebar.classList.remove('active');
        }

        // Închide search bar
        if(!inputContainer.contains(e.target) && !searchIcon.contains(e.target)) {
            inputContainer.classList.remove('active');
            headerTop.style.opacity = '1';
            headerTop.style.pointerEvents = 'all';
        }
    });

    // Închidere search la submit
    if(searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            inputContainer.classList.remove('active');
            headerTop.style.opacity = '1';
            headerTop.style.pointerEvents = 'all';
        });
    }

    // Închidere meniu la resize
    window.addEventListener('resize', () => {
        menuSidebar.classList.remove('active');
        inputContainer.classList.remove('active');
        headerTop.style.opacity = '1';
        headerTop.style.pointerEvents = 'all';
    });

    // Opțional: Închidere la apăsare Escape
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') {
            menuSidebar.classList.remove('active');
            inputContainer.classList.remove('active');
            headerTop.style.opacity = '1';
            headerTop.style.pointerEvents = 'all';
        }
    });
});