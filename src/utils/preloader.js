export default function HandlePreloading() {
    const preloader = document.querySelector(".preloader");
    document.body.style.overflowY = "hidden";
    const sleep = (ms = 3000) => new Promise((r) => setTimeout(r, ms));

    window.addEventListener("load", async () => {
        await sleep();

        document.body.style.overflowY = "auto";
        preloader.style.display = "none";
    });
}
