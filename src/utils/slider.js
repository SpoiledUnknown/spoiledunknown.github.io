import Swiper from 'swiper';
import {Autoplay, Navigation, Pagination} from 'swiper/modules';

export default function Slider() {
    const swiper = new Swiper(".swiper", {
        modules: [Autoplay, Navigation, Pagination],
        loop: true,
        spaceBetween: 50,
        grabCursor: true,
        slidesPerView: 1,
        centeredSlides: false,

        breakpoints: {
            768: {
                slidesPerView: 2,
            },

            1280: {
                slidesPerView: 3,
            }
        },

        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
}

