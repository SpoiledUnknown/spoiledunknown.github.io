import WAVES from "vanta/dist/vanta.waves.min";

export default function TurnLightModeOn() {
    const themeToggleButtons = document.querySelectorAll(".theme-toggle");
    const sunIcon = document.querySelector(".header__sun");
    const moonIcon = document.querySelector(".header__moon");
    const mobileSunIcon = document.querySelector(".header__sun-m");
    const mobileMoonIcon = document.querySelector(".header__moon-m");
    const themePanel = document.querySelector(".theme__transition");

    const themeLightModePanel = document.querySelector(".loader__light");
    const themeDarkModePanel = document.querySelector(".loader__dark");

    const theme = localStorage.getItem("theme");
    let fadePanelTimer = null;

    const background = document.querySelector(".background");

    let backgroundEffect;

    // On website-load
    if (theme !== null) {
        document.body.classList.toggle("light-mode");
        sunIcon.style.display = "none";
        mobileSunIcon.style.display = "none";
        moonIcon.style.display = "block";
        mobileMoonIcon.style.display = "block";

        backgroundEffect = WAVES.default({
            el: background,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x9FA1FF,
            shininess: 0,
            waveHeight: 36.00,
            waveSpeed: 0.35
        })
    } else {
        backgroundEffect = WAVES.default({
            el: background,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x070a13,
            shininess: 26.00,
            waveHeight: 36.00,
            waveSpeed: 0.35
        })
    }

    const showPanel = (isGoingDark) => {
        if (fadePanelTimer) {
            clearTimeout(fadePanelTimer);
            fadePanelTimer = null;
        }

        // Reset to invisible with the target colour already set
        themePanel.style.backgroundColor = isGoingDark ? "#9FA1FF" : "#070a13";
        themePanel.style.opacity = "0";
        themePanel.style.display = "flex";
        document.body.style.overflowY = "hidden";

        console.log(isGoingDark ? "dark-mode" : "light-mode");

        if (isGoingDark) {
            themeLightModePanel.style.animation = "none";
            void themeLightModePanel.offsetWidth;

            themeDarkModePanel.style.animation = "none";
            void themeDarkModePanel.offsetWidth;
            themeDarkModePanel.style.animation = "grow 8s forwards";

        } else {
            themeDarkModePanel.style.animation = "none";
            void themeDarkModePanel.offsetWidth;

            themeLightModePanel.style.animation = "none";
            void themeLightModePanel.offsetWidth;
            themeLightModePanel.style.animation = "grow 8s forwards";
        }

        // Let the browser paint the initial state, then trigger the fade-in transition
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                themePanel.style.transition = "opacity 0.5s ease";
                themePanel.style.opacity = "1";

            });
        });

        fadePanelTimer = setTimeout(hidePanel, 3000);
    };

    const hidePanel = () => {
        themePanel.style.transition = "opacity 0.5s ease";
        themePanel.style.opacity = "0";

        themePanel.addEventListener(
            "transitionend",
            () => {
                document.body.style.overflowY = "auto";
                themePanel.style.display = "none";
            },
            {once: true}
        );
    };

    const handleThemeToggle = () => {
        const isCurrentlyLight = document.body.classList.contains("light-mode");

        showPanel(isCurrentlyLight);

        // Apply the theme change after the panel has fully faded in.
        setTimeout(() => {
            document.body.classList.toggle("light-mode");

            if (document.body.classList.contains("light-mode")) {
                sunIcon.style.display = "none";
                mobileSunIcon.style.display = "none";
                moonIcon.style.display = "block";
                mobileMoonIcon.style.display = "block";
                localStorage.setItem("theme", "light-mode");

                backgroundEffect.setOptions({
                    color: 0x9FA1FF,
                    shininess: 0,
                })
            } else {
                sunIcon.style.display = "block";
                mobileSunIcon.style.display = "block";
                moonIcon.style.display = "none";
                mobileMoonIcon.style.display = "none";
                localStorage.removeItem("theme");
                document.body.removeAttribute("class");

                backgroundEffect.setOptions({
                    color: 0x070a13,
                    shininess: 26.00,
                })
            }
        }, 500);
    };

    themeToggleButtons.forEach((btn) => {
        btn.addEventListener("click", handleThemeToggle);
    });
}