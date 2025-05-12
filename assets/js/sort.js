const nameList = document.getElementById("nameList");
const sortBtn = document.getElementById("sortBtn");

function loadNames() {
  const listData = JSON.parse(localStorage.getItem("sortNames")) || [];
  renderList(listData);
}

function renderList(data) {
  nameList.innerHTML = "";
  data.forEach(({ name, timeTaken }) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="list-left">${name}</span>
      <span class="list-right">${timeTaken}s</span>
    `;
    nameList.appendChild(li);
  });
}

sortBtn.addEventListener("click", () => {
  const listData = JSON.parse(localStorage.getItem("sortNames")) || [];
  listData.sort((a, b) => a.name.localeCompare(b.name));
  renderList(listData);
});

loadNames();
