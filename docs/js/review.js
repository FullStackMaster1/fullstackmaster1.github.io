// js/reviews.js

// Function to dynamically load testimonials from JSON and build the carousel
async function loadTestimonials() {
  const indicatorsContainer = document.getElementById('carouselIndicators');
  const innerContainer = document.getElementById('carouselInner');

  // Define the path to your JSON file (assuming reviews.json is in the root directory)
  const dataPath = 'assets/reviews.json';

  try {
    const response = await fetch(dataPath);
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
                    <strong class="ml-2">5.0 stars</strong>
                </div>
            `;
      // -----------------------------

      carouselItem.innerHTML = `
                <div class="testimonial-card">
                    ${starsHtml}
                    <p class="testimonial-quote mt-3">${review.text}</p>
                    <strong class="testimonial-author">${review.author}</strong>
                    <span class="testimonial-date">${review.date}</span>
                </div>
            `;

      innerContainer.appendChild(carouselItem);
    });

    // Re-initialize the carousel after content is loaded
    // Note: $ is available because you included jQuery earlier in the HTML.
    $('#reviewCarousel').carousel();
  } catch (error) {
    console.error('Error loading testimonials:', error);
    innerContainer.innerHTML =
      '<div class="text-danger text-center p-5">Could not load testimonials. Please check reviews.json path.</div>';
  }
}

// Call the function on page load
window.addEventListener('load', loadTestimonials);
