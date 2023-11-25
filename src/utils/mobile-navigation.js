function MobileNavigation()
{
    const headerBtn = document.querySelector('.header__bars')
    const mobileNav = document.querySelector('.mobile-nav')
    const mobileLinks = document.querySelectorAll('.mobile-nav__link')

    let isMobileMenuOpen = false

    headerBtn.addEventListener('click', () => {
        isMobileMenuOpen = !isMobileMenuOpen
        if (isMobileMenuOpen) {
            mobileNav.style.display = 'flex'
            document.body.style.overflowY = 'hidden';
        }
        else
        {
            mobileNav.style.display = 'none'
            document.body.style.overflowY = 'auto';
        }
    })

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMobileMenuOpen = false
            mobileNav.style.display = 'none'
            document.body.style.overflowY = 'auto';
        })
    } )
    
}

export default MobileNavigation