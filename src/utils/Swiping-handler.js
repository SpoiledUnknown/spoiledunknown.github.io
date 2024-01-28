import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

const swiper = new Swiper('.card__content', {

  modules: [Navigation, Pagination],

  loop: true,
  spaceBetween: 32,
  grabCursor: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
      475: {
          slidesPerView: 1,
      },

      768: {
          slidesPerView: 2,
      },

      1280: {
          slidesPerView: 3,
      },
  }
});
