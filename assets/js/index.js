document.addEventListener("DOMContentLoaded", () => {
  // Form elements
  const contactForm = document.getElementById("contact-form")
  const nameInput = document.getElementById("name")
  const emailInput = document.getElementById("email")
  const messageInput = document.getElementById("message")
  const successMessage = document.getElementById("success-message")
  const closeSuccessBtn = document.getElementById("close-success")
  const timeSpentElement = document.getElementById("time-spent")

  // Star rating elements
  const starRating = document.getElementById("star-rating")
  const stars = document.querySelectorAll(".star")
  const ratingInput = document.getElementById("rating")

  // Form timing variables
  let startTime = null
  let formInteracted = false

  // Initialize form timing
  function initFormTiming() {
    const formInputs = [nameInput, emailInput, messageInput]

    formInputs.forEach((input) => {
      input.addEventListener("focus", () => {
        if (!formInteracted) {
          startTime = new Date()
          formInteracted = true
        }
      })
    })
  }

  // Initialize star rating
  function initStarRating() {
    stars.forEach((star) => {
      // Hover effect
      star.addEventListener("mouseover", function () {
        const value = Number.parseInt(this.getAttribute("data-value"))
        highlightStars(value)
      })

      // Mouse leave effect
      starRating.addEventListener("mouseleave", () => {
        const currentRating = Number.parseInt(ratingInput.value)
        highlightStars(currentRating)
      })

      // Click effect
      star.addEventListener("click", function () {
        const value = Number.parseInt(this.getAttribute("data-value"))
        ratingInput.value = value
        highlightStars(value)
      })
    })
  }

  // Highlight stars up to a specific value
  function highlightStars(value) {
    stars.forEach((star) => {
      const starValue = Number.parseInt(star.getAttribute("data-value"))
      if (starValue <= value) {
        star.classList.add("active")
      } else {
        star.classList.remove("active")
      }
    })
  }

  // Form validation
  function validateForm() {
    let isValid = true

    // Validate name
    if (!nameInput.value.trim()) {
      showError(nameInput, "name-error", "Name is required")
      isValid = false
    } else {
      clearError(nameInput, "name-error")
    }

    // Validate email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailInput.value.trim()) {
      showError(emailInput, "email-error", "Email is required")
      isValid = false
    } else if (!emailPattern.test(emailInput.value)) {
      showError(emailInput, "email-error", "Please enter a valid email address")
      isValid = false
    } else {
      clearError(emailInput, "email-error")
    }

    // Validate message
    if (!messageInput.value.trim()) {
      showError(messageInput, "message-error", "Message is required")
      isValid = false
    } else {
      clearError(messageInput, "message-error")
    }

    return isValid
  }

  // Show error message
  function showError(input, errorId, message) {
    const errorElement = document.getElementById(errorId)
    input.style.borderColor = "var(--error-color)"
    errorElement.textContent = message
  }

  // Clear error message
  function clearError(input, errorId) {
    const errorElement = document.getElementById(errorId)
    input.style.borderColor = "var(--border-color)"
    errorElement.textContent = ""
  }

  // Calculate time spent on form
  function calculateTimeSpent() {
    if (!startTime) return "Less than a second"

    const endTime = new Date()
    const timeSpentMs = endTime - startTime
    const seconds = Math.floor(timeSpentMs / 1000)

    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? "s" : ""}`
    } else {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${minutes} minute${minutes !== 1 ? "s" : ""} and ${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""}`
    }
  }

  // Form submission
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    if (validateForm()) {
      const timeSpent = calculateTimeSpent()
      timeSpentElement.textContent = `You spent ${timeSpent} filling out this form.`

      // Show success message
      successMessage.classList.add("show")

      // Reset form
      contactForm.reset()
      highlightStars(0)

      // Reset timing variables
      startTime = null
      formInteracted = false
    }
  })

  // Close success message
  closeSuccessBtn.addEventListener("click", () => {
    successMessage.classList.remove("show")
  })

  // Initialize
  initFormTiming()
  initStarRating()
})
