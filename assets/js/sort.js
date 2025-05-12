document.getElementById("sortBtn").addEventListener("click", () => {
  const list = document.getElementById("nameList");
  const items = Array.from(list.getElementsByTagName("li"));
  const names = items.map(item => item.textContent).sort();

  list.innerHTML = "";
  names.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    list.appendChild(li);
  });
});
