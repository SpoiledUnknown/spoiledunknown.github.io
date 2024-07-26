export default function HandleImageLoading() {
    const lazyImages = document.querySelectorAll(".lazy");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((loadedImage) => {
            if (loadedImage.isIntersecting) {
                let image = loadedImage.target;
                image.src = image.dataset.src;
                image.classList.remove("loading");
                image.classList.add("loaded");
                observer.unobserve(image);
            }
        });
    });

    lazyImages.forEach((img) => {
        observer.observe(img);
    });
}
