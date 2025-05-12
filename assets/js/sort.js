document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const sortButton = document.getElementById("sort-button")
  const teamList = document.getElementById("team-list")

  // Track sort state
  let isSorted = false

  // Get all team cards
  const getTeamCards = () => {
    return Array.from(teamList.querySelectorAll(".team-card"))
  }

  // Extract name from team card
  const getNameFromCard = (card) => {
    return card.querySelector("h3").textContent
  }

  // Sort team cards alphabetically
  const sortTeamCards = () => {
    const cards = getTeamCards()

    // Sort cards by name
    cards.sort((a, b) => {
      const nameA = getNameFromCard(a)
      const nameB = getNameFromCard(b)

      if (isSorted) {
        // If already sorted, reverse the order
        return nameB.localeCompare(nameA)
      } else {
        // Sort alphabetically
        return nameA.localeCompare(nameB)
      }
    })

    // Clear the team list
    teamList.innerHTML = ""

    // Add animation delay for staggered effect
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.05}s`
      teamList.appendChild(card)
    })

    // Toggle sort state
    isSorted = !isSorted

    // Update button state
    if (isSorted) {
      sortButton.classList.add("sorted")
      sortButton.querySelector("span").textContent = "Sort Reverse Alphabetically"
    } else {
      sortButton.classList.remove("sorted")
      sortButton.querySelector("span").textContent = "Sort Alphabetically"
    }
  }

  // Add click event to sort button
  sortButton.addEventListener("click", sortTeamCards)
})
