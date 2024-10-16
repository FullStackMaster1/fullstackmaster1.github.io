// Prevent carousel auto-scroll bug

$('.carousel').on('slid.bs.carousel', function () {
  $(this).carousel('pause'); // Stops the auto-scrolling
});
