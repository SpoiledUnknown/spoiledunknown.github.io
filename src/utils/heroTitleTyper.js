const titles = [
    "Full-Stack%Developer",
    "Game%Developer"
];

const prefix      = "%";
const typingSpeed   = 100;
const deletingSpeed = 50;
const pauseAfterType  = 2000;
const pauseBeforeType = 400;

export default function HeroTitleTyper() {
    const title = document.getElementById("heroTitle");

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function formatTitle(str) {
        return str
            .split(prefix)
            .join("<br>");
    }

    function tick() {
        const current = titles[titleIndex];

        if (!isDeleting) {
            title.innerHTML = formatTitle(current.slice(0, ++charIndex));

            if (charIndex === current.length) {
                isDeleting = true;
                setTimeout(tick, pauseAfterType);
                return;
            }
            setTimeout(tick, typingSpeed);

        } else {
            title.innerHTML = formatTitle(current.slice(0, --charIndex));

            if (charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                setTimeout(tick, pauseBeforeType);
                return;
            }
            setTimeout(tick, deletingSpeed);
        }
    }

    tick();
}