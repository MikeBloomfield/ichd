document.addEventListener('DOMContentLoaded', function () {
  new WOW().init();

  let tl = gsap.timeline({ paused: true, repeat: -1 });
  let tl2 = gsap.timeline({ paused: true, repeat: -1 });

  let phone = document.querySelector('.header__phone a');

  tl.to('.header__phone path:first-child', {
    rotation: 5,
    delay: 0,
    duration: 0.2,
    ease: 'ease.out',
  });
  tl.to('.header__phone path:first-child', {
    rotation: -5,
    delay: 0,
    duration: 0.2,
    ease: 'ease.out',
  });

  tl2.to('.header__phone path:not(:first-child)', {
    y: -5,
    x: 8,
    scale: 1.5,
    opacity: 0,
    duration: 0.8,
    stagger: {
      from: 'end',
      each: 0.1,
    },
    ease: 'ease.out',
  });

  phone.addEventListener('mouseover', () => {
    tl.play();
    tl2.play();
  });
  phone.addEventListener('mouseleave', () => {
    tl.totalTime(tl.rawTime() % 1).reverse();
    tl2.totalTime(tl2.rawTime() % 1).reverse();
  });

  const header = document.querySelector('.header');
  let scrollPrev = 0;
  window.addEventListener('scroll', function () {
    let scrolled = window.scrollY;


    if (scrolled > 50 && scrolled > scrollPrev) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }

    scrollPrev = scrolled;
  });

  if (window.pageYOffset > 40) {
    header.classList.add('fixed');
  }

  (function () {
    const header = document.querySelector('.header');
    window.onscroll = () => {
      if (window.pageYOffset > 40) {
        header.classList.add('fixed');
      } else {
        header.classList.remove('fixed');
      }
    };
  })();

  if (window.matchMedia('(min-width: 769px').matches) {
    gsap.to('.video__abs-1 img', {
      yPercent: -50,
      ease: 'power3',
      scrollTrigger: {
        trigger: '.video__block',
        toggleActions: 'play pause resume none',
        start: 'top 20%',
        end: 'bottom 20%',
        scrub: true,
      },
    });
    gsap.to('.video__abs-2 img', {
      yPercent: -20,
      ease: 'power3',
      scrollTrigger: {
        trigger: '.video__block',
        toggleActions: 'play pause resume none',
        start: 'top 20%',
        end: 'bottom 20%',
        scrub: true,
      },
    });
    gsap.to('.video__abs-3 img', {
      yPercent: -40,
      ease: 'power3',
      scrollTrigger: {
        trigger: '.video__block',
        toggleActions: 'play pause resume none',
        start: 'top 20%',
        end: 'bottom 20%',
        scrub: true,
      },
    });
  }
  if (window.matchMedia('(max-width: 768px)').matches) {
    gsap.to('.video__abs-1 img', {
      y: -25,
      ease: 'power3',
      scrollTrigger: {
        trigger: '.video__block',
        toggleActions: 'play pause resume none',
        start: 'top 20%',
        end: 'bottom 20%',
        scrub: true,
      },
    });
    gsap.to('.video__abs-2 img', {
      y: -15,
      ease: 'power3',
      scrollTrigger: {
        trigger: '.video__block',
        toggleActions: 'play pause resume none',
        start: 'top 20%',
        end: 'bottom 20%',
        scrub: true,
      },
    });
    gsap.to('.video__abs-3 img', {
      y: -10,
      ease: 'power3',
      scrollTrigger: {
        trigger: '.video__block',
        toggleActions: 'play pause resume none',
        start: 'top 20%',
        end: 'bottom 20%',
        scrub: true,
      },
    });
  }

  gsap.to('.map__outer', {
    yPercent: -15,
    ease: 'power3',
    scrollTrigger: {
      trigger: '.map__pic',
      toggleActions: 'play pause resume none',
      start: 'top 20%',
      end: 'bottom 50%',
      scrub: true,
    },
  });

  $('.header__burger').click(function () {
    $('body').toggleClass('active');
  });

  $('.js-scroll').click(function () {
    $('body').removeClass('active');
  });

  $('.services__wrapper-hide').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    variableWidth: true,
    accessibility: false,
    prevArrow: $('.services__prev'),
    nextArrow: $('.services__next'),
  });

  $('.hero__slider-wrapper').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    variableWidth: true,
    accessibility: false,
    prevArrow: $('.hero__prev'),
    nextArrow: $('.hero__next'),
  });

  $('.hero__slider-wrapper').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    gsap.to('.hero__title-wrapper:not(:last-child) span', {
      yPercent: 100,
      duration: 0.3,
      ease: 'power4',
    });
    gsap.to('.hero__title-wrapper:last-child span', {
      yPercent: 100,
      delay: 0.2,
      duration: 0.3,
      ease: 'power4',
    });
    gsap.to('.hero__desc', {
      opacity: 0,
    });
  });

  // loader
  setTimeout(function () {
    document.querySelector('body').classList.remove('loaded');
  }, 400);

  const mainPageVideo = document.querySelector('.video__block');
  if (mainPageVideo) {
    const playerPlay = document.querySelector('#playVideo');
    playerPlay.addEventListener('click', () => {
      $(playerPlay).hide();
      $('.video__abs-1, .video__abs-2, .video__abs-3').hide();
      const player = document.querySelector('#mainVideo');
      let data = { method: 'play' };
      player.contentWindow.postMessage(JSON.stringify(data), '*');
      mainPageVideo.classList.add('activeVideo');
    });
  }

  let slides = $('.hero__slider-item:last-child').index();
  $('.hero__pages-total').html('0' + (slides + 1));

  let slidesStories = $('.swiper-slide:last-child').index();
  $('.stories__pages-total').html(slidesStories + 1);

  let slidesServices = $('.services__item:last-child').index();
  $('.services__pages-total').html('0' + (slidesServices + 1));

  $('.hero__title').hide();
  $('.hero__desc').hide();
  $('.hero__title').eq(0).show();
  $('.hero__desc').eq(0).show();

  $('.hero__next, .hero__prev').click(function () {
    setTimeout(() => {
      gsap.to('.hero__title-wrapper:not(:last-child) span', {
        yPercent: 0,
        duration: 0.3,
      });
      gsap.to('.hero__title-wrapper:last-child span', {
        yPercent: 0,
        delay: 0.2,
        duration: 0.3,
      });

      gsap.to('.hero__desc', {
        opacity: 1,
      });
      let slide = $('div.slick-current').index() + 1;
      $('.hero__pages-span').html('0' + slide);
      $('.hero__title').eq(slide).hide();
      $('.hero__desc').eq(slide).hide();
      $('.hero__title')
        .eq(slide - 2)
        .hide();
      $('.hero__desc')
        .eq(slide - 2)
        .hide();
      $('.hero__title')
        .eq(slide - 1)
        .show();
      $('.hero__desc')
        .eq(slide - 1)
        .show();
    }, 500);
  });

  $('.hero__slider-wrapper').on('swipe', function () {
    setTimeout(() => {
      gsap.to('.hero__title-wrapper:not(:last-child) span', {
        yPercent: 0,
        duration: 0.3,
      });
      gsap.to('.hero__title-wrapper:last-child span', {
        yPercent: 0,
        delay: 0.2,
        duration: 0.3,
      });

      gsap.to('.hero__desc', {
        opacity: 1,
      });
      let slide = $('div.slick-current').index() + 1;
      $('.hero__pages-span').html('0' + slide);
      $('.hero__title').eq(slide).hide();
      $('.hero__desc').eq(slide).hide();
      $('.hero__title')
        .eq(slide - 2)
        .hide();
      $('.hero__desc')
        .eq(slide - 2)
        .hide();
      $('.hero__title')
        .eq(slide - 1)
        .show();
      $('.hero__desc')
        .eq(slide - 1)
        .show();
    }, 500);
  });

  $('.swiper-button-prev, .swiper-button-next').click(function () {
    let slide = $('.swiper-slide-active').index() + 1;
    $('.stories__pages-span').html('0' + slide);
  });

  $('.services__prev, .services__next').click(function () {
    let slide = $('.services__item.slick-current').index() + 1;
    $('.services__pages-span').html('0' + slide);
  });

  $('.services__wrapper-hide').on('swipe', function () {
    let slide = $('.services__item.slick-current').index() + 1;
    $('.services__pages-span').html('0' + slide);
  });

  $('.stories__story-item-title').lettering('lines');
  $('.stories__story-item-title span').lettering('words');
  $('.stories__story-item-label').lettering('lines');
  $('.stories__story-item-label span').lettering('words');
  $('.stories__story-item-desc').lettering('lines');
  $('.stories__story-item-desc span').lettering('words');
  $('.stories__story-item-desc-hidden').lettering('lines');
  $('.stories__story-item-desc-hidden span').lettering('words');

  swiper.on('slideChange', function () {
    setTimeout(() => {
      let number = $('.swiper-pagination-current').html();
      $('.stories__story-item').hide();
      $('.stories__story-item')
        .eq(number - 1)
        .show();
      gsap.to('span[class^=word]', {
        yPercent: 0,
        duration: 0.3,
      });
    }, 500);
  });
  swiper.on('click', function () {
    let number = $('.swiper-pagination-current').html();
    $('.stories__story-item').hide();
    $('.stories__story-item')
      .eq(number - 1)
      .show();
  });

  swiper.on('beforeTransitionStart', function () {
    gsap.to('span[class^=word]', {
      yPercent: 100,
      duration: 0.3,
    });
  });

  /* components */

  //prevent drag img and a
  const imagesAndLinks = document.querySelectorAll('img, a');
  if (imagesAndLinks) {
    imagesAndLinks.forEach(function (item, i, arr) {
      item.addEventListener('dragstart', function (e) {
        e.preventDefault();
      });
    });
  }

  // js-scroll
});

/* viewport width */
function viewport() {
  let e = window,
    a = 'inner';
  if (!('innerWidth' in window)) {
    a = 'client';
    e = document.documentElement || document.body;
  }
  return { width: e[a + 'Width'], height: e[a + 'Height'] };
}
/* viewport width */

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 5,
  centeredSlides: true,
  pagination: {
    el: '.stories__pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.stories__next',
    prevEl: '.stories__prev',
  },
  spaceBetween: 20,
  speed: 1000,
});

(function () {
  const smoothScroll = function (targetEl, duration) {
    const headerElHeight = 80;
    let target = document.querySelector(targetEl);
    let targetPosition = target.getBoundingClientRect().top - headerElHeight;
    let startPosition = window.pageYOffset;
    let startTime = null;

    const ease = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animation = function (currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, targetPosition, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
  };

  const scrollTo = function () {
    const links = document.querySelectorAll('.js-scroll');
    links.forEach((each) => {
      each.addEventListener('click', function () {
        const currentTarget = this.getAttribute('href');
        smoothScroll(currentTarget, 1000);
      });
    });
  };
  scrollTo();
})();

// let title = document.querySelector('.hero__title');

// let settings = {
//   edge: 200,
// };
// let two = -settings.edge;

// window.addEventListener('scroll', () => {
//   let condition = title.getBoundingClientRect().top - window.innerHeight;
//   if ((condition <= two) & (condition >= settings.edge - window.innerHeight)) {
//     title.style.backgroundColor = 'red';
//   }
// });
