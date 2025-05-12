const stars = document.querySelectorAll(".star");
const ratingText = document.getElementById("rating-value");
let selectedRating = 0;

stars.forEach((star) => {
  star.addEventListener("mouseover", () => {
    resetStars();
    highlightStars(star.dataset.value);
  });

  star.addEventListener("mouseout", () => {
    resetStars();
    highlightStars(selectedRating);
  });

  star.addEventListener("click", () => {
    selectedRating = star.dataset.value;
    ratingText.textContent = `You rated ${selectedRating} star(s)!`;
    highlightStars(selectedRating);
  });
});

function highlightStars(rating) {
  stars.forEach((star) => {
    if (star.dataset.value <= rating) {
      star.classList.add("selected");
    }
  });
}

function resetStars() {
  stars.forEach((star) => {
    star.classList.remove("selected");
  });
}
