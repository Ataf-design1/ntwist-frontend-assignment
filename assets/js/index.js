const db = [
  { name: "Priya", email: "priya@example.com", message: "Hello from Priya" },
  { name: "Ali", email: "ali@example.com", message: "I need help" }
];

const form = document.getElementById("contactForm");
const confirmation = document.getElementById("confirmation");
const entriesList = document.getElementById("entriesList");
let startTime = null;

form.addEventListener("focusin", () => {
  if (!startTime) startTime = new Date();
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  db.push({ name, email, message });

  const endTime = new Date();
  const secondsSpent = Math.round((endTime - startTime) / 1000);
  confirmation.textContent = `Message Sent Successfully! Time Spent: ${secondsSpent}s`;
  confirmation.classList.remove("hidden");

  form.reset();
  renderEntries();
  startTime = null;
});

function renderEntries() {
  entriesList.innerHTML = "";
  db.forEach(entry => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${entry.name}</strong> (${entry.email}): ${entry.message}`;
    entriesList.appendChild(li);
  });
}

renderEntries();
