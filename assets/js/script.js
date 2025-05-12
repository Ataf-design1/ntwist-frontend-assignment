let startTime = null;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const timeInfo = document.getElementById("time-info");
  const successMessage = document.getElementById("success-message");

  form.addEventListener("focusin", () => {
    if (!startTime) {
      startTime = new Date();
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const endTime = new Date();
    const duration = Math.floor((endTime - startTime) / 1000); // in seconds

    timeInfo.textContent = `You took ${duration} seconds to complete the form.`;
    successMessage.textContent = "Form submitted successfully!";

    form.reset();
    startTime = null;
  });
});
