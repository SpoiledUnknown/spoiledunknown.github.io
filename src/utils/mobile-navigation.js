function MobileNavigation() {
    const headerBtn = document.querySelector('.header__bars');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');

    let isMobileMenuOpen = false;

    headerBtn.addEventListener('click', () => {
        isMobileMenuOpen = !isMobileMenuOpen;

        if (isMobileMenuOpen) {
            mobileNav.style.display = 'flex';
            document.body.style.overflowY = 'hidden';

            // Trigger a reflow before changing the opacity for the fade-in effect
            void mobileNav.offsetWidth;
            mobileNav.style.opacity = '1'; // Add fade-in effect
        } else {
            mobileNav.style.opacity = '0'; // Set opacity to 0 for fade-out effect
        }
    });

    mobileNav.addEventListener('transitionend', () => {
        if (!isMobileMenuOpen) {
            mobileNav.style.display = 'none';
            document.body.style.overflowY = 'auto';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMobileMenuOpen = false;
            mobileNav.style.opacity = '0'; // Set opacity to 0 for fade-out effect
        });
    });
}

export default MobileNavigation;
