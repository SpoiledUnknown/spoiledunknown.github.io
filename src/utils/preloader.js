export default function HandlePreloading() {
    const preloader = document.querySelector(".preloader");
    const form = document.querySelector(".contact__form");
    document.body.style.overflowY = "hidden";

    window.addEventListener("load", async () => {
        if (form !== null) form.reset();
        preloader.style.display = "none";
        document.body.style.overflowY = "auto";
    });
}
