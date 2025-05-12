const stars = document.querySelectorAll('.star');
const ratingDisplay = document.getElementById('rating-value');

let selectedRating = 0;

stars.forEach((star) => {
  star.addEventListener('mouseover', () => {
    const value = +star.getAttribute('data-value');
    highlightStars(value);
  });

  star.addEventListener('mouseout', () => {
    highlightStars(selectedRating);
  });

  star.addEventListener('click', () => {
    selectedRating = +star.getAttribute('data-value');
    ratingDisplay.textContent = `You rated: ${selectedRating} star${selectedRating > 1 ? 's' : ''}`;
    highlightStars(selectedRating);
  });
});

function highlightStars(rating) {
  stars.forEach((star) => {
    const val = +star.getAttribute('data-value');
    if (val <= rating) {
      star.classList.add('selected');
    } else {
      star.classList.remove('selected');
    }
  });
}
