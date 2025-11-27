// js/reviews.js

// Function to dynamically load testimonials from JSON and build the carousel
async function loadTestimonials() {
  const indicatorsContainer = document.getElementById('carouselIndicators');
  const innerContainer = document.getElementById('carouselInner');

  // ⭐️ CORRECTED PATH: Since GitHub Pages serves from the /docs folder,
  // the path is relative to the root of that published folder.
  const dataPath = 'assets/reviews.json';

  try {
    const response = await fetch(dataPath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const reviews = await response.json();

    // Clear the "Loading" message
    innerContainer.innerHTML = '';

    reviews.forEach((review, index) => {
      // 1. Build Indicator
      const indicator = document.createElement('li');
      indicator.setAttribute('data-target', '#reviewCarousel');
      indicator.setAttribute('data-slide-to', index);
      if (index === 0) {
        indicator.classList.add('active');
      }
      indicatorsContainer.appendChild(indicator);

      // 2. Build Carousel Item (the Review Card)
      const carouselItem = document.createElement('div');
      carouselItem.classList.add('carousel-item');
      if (index === 0) {
        carouselItem.classList.add('active');
      }

      // --- STAR RATING HTML ---
      const starsHtml = `
                <div class="mb-2">
                    <span class="fa fa-star text-warning"></span>
                    <span class="fa fa-star text-warning"></span>
                    <span class="fa fa-star text-warning"></span>
                    <span class="fa fa-star text-warning"></span>
                    <span class="fa fa-star text-warning"></span> 
                    <strong class="ml-2">${review.stars.toFixed(
                      1
                    )} stars</strong>
                </div>
            `;

      // Rupesh's reply section (conditionally added)
      const replyHtml =
        review.reply && review.reply.trim() !== ''
          ? `<div class="testimonial-reply">
                       <strong>Rupesh's Reply:</strong> ${review.reply}
                   </div>`
          : '';

      // -----------------------------

      carouselItem.innerHTML = `
                <div class="testimonial-card">
                    ${starsHtml}
                    <p class="testimonial-quote mt-3">${review.text}</p>
                    <strong class="testimonial-author">${review.author}</strong>
                    <span class="testimonial-date">${review.date}</span>
                    ${replyHtml} 
                </div>
            `;

      innerContainer.appendChild(carouselItem);
    });

    // Re-initialize the carousel after content is loaded
    $('#reviewCarousel').carousel();
  } catch (error) {
    console.error('Error loading testimonials:', error);
    innerContainer.innerHTML = `<div class="text-danger text-center p-5">
            Could not load testimonials. Please check the 'reviews.json' path: ${dataPath}.
        </div>`;
  }
}

// Call the function on page load
window.addEventListener('load', () => {
  setTimeout(loadTestimonials, 100);
});
