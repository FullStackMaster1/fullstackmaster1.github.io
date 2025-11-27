const carousel = document.querySelector('.review-carousel');

setInterval(() => {
  carousel.scrollBy({
    left: 350,
    behavior: 'smooth',
  });
  if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
    carousel.scrollTo({ left: 0, behavior: 'smooth' });
  }
}, 3500);
