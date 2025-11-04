const categories = {
  frutas: ["maçã", "banana", "laranja", "uva", "pera"],
  limpeza: ["sabão", "detergente", "desinfetante"],
  bebidas: ["água", "sumo", "refrigerante", "café"],
};

const itemInput = document.getElementById("itemInput");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const listDiv = document.getElementById("list");

let lista = JSON.parse(localStorage.getItem("lista")) || {};

function getCategoria(item) {
  const nome = item.toLowerCase();
  for (const cat in categories) {
    if (categories[cat].includes(nome)) return cat;
  }
  return "outros";
}

function renderLista() {
  listDiv.innerHTML = "";
  for (const cat in lista) {
    const catDiv = document.createElement("div");
    catDiv.className = "category";
    catDiv.innerHTML = `<h3>${cat.toUpperCase()}</h3>`;
    lista[cat].forEach((item, index) => {
      const p = document.createElement("p");
      p.textContent = item;
      p.onclick = () => removeItem(cat, index);
      catDiv.appendChild(p);
    });
    listDiv.appendChild(catDiv);
  }
}

function addItem() {
  const item = itemInput.value.trim();
  if (!item) return;
  const cat = getCategoria(item);
  if (!lista[cat]) lista[cat] = [];
  lista[cat].push(item);
  localStorage.setItem("lista", JSON.stringify(lista));
  itemInput.value = "";
  renderLista();
}

function removeItem(cat, index) {
  lista[cat].splice(index, 1);
  if (lista[cat].length === 0) delete lista[cat];
  localStorage.setItem("lista", JSON.stringify(lista));
  renderLista();
}

function clearAll() {
  lista = {};
  localStorage.removeItem("lista");
  renderLista();
}

addBtn.onclick = addItem;
clearBtn.onclick = clearAll;

renderLista();
