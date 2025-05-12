const form = document.getElementById("contactForm");
const confirmation = document.getElementById("confirmation");
const entriesList = document.getElementById("entriesList");

let startTime = null;
let selectedRating = 0;

// Track form start time
form.addEventListener("focusin", () => {
  if (!startTime) startTime = new Date();
});

// Star rating logic
const stars = document.querySelectorAll('.star');
stars.forEach((star) => {
  star.addEventListener('click', () => {
    selectedRating = +star.getAttribute('data-value');
    stars.forEach((s, i) => {
      s.classList.toggle('selected', i < selectedRating);
    });
  });
});

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const endTime = new Date();
  const duration = Math.floor((endTime - startTime) / 1000);

  const formData = new FormData(form);
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  const entry = { name, email, message, timeTaken: duration, rating: selectedRating };

  // Save in localStorage
  const db = JSON.parse(localStorage.getItem("entries")) || [];
  db.push(entry);
  localStorage.setItem("entries", JSON.stringify(db));

  // Also update sort data
  const listData = JSON.parse(localStorage.getItem("sortNames")) || [];
  listData.push({ name, timeTaken: duration });
  localStorage.setItem("sortNames", JSON.stringify(listData));

  confirmation.textContent = `Message Sent Successfully! Time Spent: ${duration}s`;
  confirmation.classList.remove("hidden");

  form.reset();
  selectedRating = 0;
  stars.forEach(s => s.classList.remove('selected'));
  startTime = null;

  renderEntries();
});

function renderEntries() {
  const db = JSON.parse(localStorage.getItem("entries")) || [];
  entriesList.innerHTML = "";

  db.forEach((entry) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${entry.name}</strong><br>
      <small>${entry.email}</small><br>
      ${entry.message}<br>
      ⭐ Rating: ${entry.rating || "Not given"}<br>
      ⏱ ${entry.timeTaken}s
    `;
    entriesList.appendChild(li);
  });
}

renderEntries();
