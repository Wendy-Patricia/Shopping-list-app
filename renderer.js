document.addEventListener("DOMContentLoaded", () => {
  const itemInput = document.getElementById("itemInput");
  const addBtn = document.getElementById("addBtn");
  const clearBtn = document.getElementById("clearBtn");
  const listDiv = document.getElementById("list");
  const toast = document.getElementById("toast");

  let list = JSON.parse(localStorage.getItem("list")) || [];

  function renderList() {
    listDiv.innerHTML = "";
    list.forEach((item, index) => {
      const p = document.createElement("p");
      p.textContent = `• ${item}`;

      const removeBtn = document.createElement("span");
      removeBtn.textContent = "✖";
      removeBtn.onclick = () => removeItem(index);

      p.appendChild(removeBtn);
      listDiv.appendChild(p);
    });
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 2000);
  }

  function addItem() {
    const item = itemInput.value.trim();
    if (!item) return;

    list.push(item); 
    localStorage.setItem("list", JSON.stringify(list));
    itemInput.value = "";
    renderList();
    showToast("Item added!");
  }

  function removeItem(index) {
    list.splice(index, 1);
    localStorage.setItem("list", JSON.stringify(list));
    renderList();
    showToast("Item removed");
  }

  function clearAll() {
    list = [];
    localStorage.removeItem("list");
    renderList();
    showToast("All cleared");
  }

  addBtn.addEventListener("click", addItem);
  clearBtn.addEventListener("click", clearAll);

  itemInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addItem();
  });

  renderList();
});
