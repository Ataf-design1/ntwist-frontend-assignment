// Timer for form (index.html)
let startTime = null;

document.addEventListener("DOMContentLoaded", () => {
  // --- Form Timer Logic ---
  const form = document.getElementById("contact-form");
  const timeInfo = document.getElementById("time-info");
  const successMessage = document.getElementById("success-message");

  if (form) {
    form.addEventListener("focusin", () => {
      if (!startTime) {
        startTime = new Date();
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const endTime = new Date();
      const duration = Math.floor((endTime - startTime) / 1000); // seconds

      timeInfo.textContent = `You took ${duration} seconds to complete the form.`;
      successMessage.textContent = "Form submitted successfully!";

      form.reset();
      startTime = null;
    });
  }

  // --- Sortable List Logic (sort.html) ---
  const sortButton = document.getElementById("sort-button");
  const nameList = document.getElementById("name-list");

  if (sortButton && nameList) {
    sortButton.addEventListener("click", () => {
      const items = Array.from(nameList.children);
      const sortedNames = items
        .map((li) => li.textContent)
        .sort((a, b) => a.localeCompare(b));

      nameList.innerHTML = ""; // Clear existing list

      sortedNames.forEach((name) => {
        const li = document.createElement("li");
        li.textContent = name;
        nameList.appendChild(li);
      });
    });
  }
});
