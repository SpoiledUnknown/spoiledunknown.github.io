export default function HandlePreloading() {
    const preloader = document.querySelector(".preloader");
    const form = document.querySelector(".contact__form");
    document.body.style.overflowY = "hidden";

    window.addEventListener("load", async () => {
        if (form !== null) form.reset();
        preloader.style.opacity = "0";
        document.body.style.overflowY = "auto";
    });

    preloader.addEventListener("transitionend", () => {
        preloader.style.display = "none";
    })
}
