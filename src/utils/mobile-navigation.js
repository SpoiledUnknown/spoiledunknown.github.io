export default function MobileNavigation() {
  const headerBtn = document.querySelector(".header__bars");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileLinks = document.querySelectorAll(".mobile-nav__link");

  let isMobileMenuOpen = false;

  headerBtn.addEventListener("click", () => {
    isMobileMenuOpen = !isMobileMenuOpen;

    if (isMobileMenuOpen) {
      mobileNav.style.opacity = "0";         // reset to 0 first
      mobileNav.style.display = "flex";
      document.body.style.overflowY = "hidden";
      void mobileNav.offsetWidth;            // force reflow AFTER display change
      mobileNav.style.opacity = "1";         // now the transition fires correctly
    } else {
      mobileNav.style.opacity = "0";
    }
  });

  mobileNav.addEventListener("transitionend", () => {
    if (!isMobileMenuOpen) {
      mobileNav.style.display = "none";
      document.body.style.overflowY = "auto";
    }
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      isMobileMenuOpen = false;
      mobileNav.style.opacity = "0";
    });
  });
}