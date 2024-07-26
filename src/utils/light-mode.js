export default function TurnLightModeOn() {
    const themeToggleButtons = document.querySelectorAll("#theme-toggle");
    const sunIcon = document.querySelector(".header__sun");
    const moonIcon = document.querySelector(".header__moon");

    const mobileSunIcon = document.querySelector(".header__sun-m");
    const mobileMoonIcon = document.querySelector(".header__moon-m");

    //state
    const theme = localStorage.getItem("theme");

    //on website-load
    if (theme !== null) {
        document.body.classList.toggle("light-mode");
        sunIcon.style.display = "none";
        mobileSunIcon.style.display = "none";
        moonIcon.style.display = "block";
        mobileMoonIcon.style.display = "block";
    }

    //handlers
    const handleThemeToggle = () => {
        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            sunIcon.style.display = "none";
            mobileSunIcon.style.display = "none";
            moonIcon.style.display = "block";
            mobileMoonIcon.style.display = "block";
            localStorage.setItem("theme", "light-mode");
        } else {
            sunIcon.style.display = "block";
            mobileSunIcon.style.display = "block";
            moonIcon.style.display = "none";
            mobileMoonIcon.style.display = "none";
            localStorage.removeItem("theme");
            document.body.removeAttribute("class");
        }
    };

    //Events
    themeToggleButtons.forEach((btn) => {
        btn.addEventListener("click", handleThemeToggle);
    });
}
