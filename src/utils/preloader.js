export default function HandlePreloading() {
    const preloader = document.querySelector(".preloader");
    const form = document.querySelector(".contact__form");
    const sleep = (ms = 3000) => new Promise((r) => setTimeout(r, ms));
    document.body.style.overflowY = "hidden";

    window.addEventListener("load", async () => {
        await sleep();

        if (form !== null) form.reset();
        preloader.style.display = "none";
        document.body.style.overflowY = "auto";
    });
}
