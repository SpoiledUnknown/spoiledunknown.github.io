import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const swiper = new Swiper(".card__content", {
    modules: [Autoplay, Navigation, Pagination],
    loop: true,
    spaceBetween: 50,
    grabCursor: true,

    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

export default swiper;
