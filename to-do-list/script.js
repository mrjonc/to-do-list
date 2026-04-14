const localStorageName = "to-do-list";
const body = document.body;

// Carregar Tema
const savedTheme = localStorage.getItem("theme-preference") || "light-mode";
body.classList.add(savedTheme);

function validateNewTask() {
  let values = JSON.parse(localStorage.getItem(localStorageName)) || [];
  let inputValue = document.querySelector("#task").value.trim();
  return values.some((x) => x.name.toLowerCase() === inputValue.toLowerCase());
}

function newTask(event) {
  if (event) event.preventDefault();

  let input = document.querySelector("#task");
  let spaceOut = input.value.trim();

  if (!spaceOut) {
    alert("Digite uma tarefa antes de enviar.");
  } else if (validateNewTask()) {
    alert("Já existe uma tarefa com essa descrição.");
  } else {
    let values = JSON.parse(localStorage.getItem(localStorageName)) || [];
    values.push({ name: spaceOut });
    localStorage.setItem(localStorageName, JSON.stringify(values));
    input.value = "";
    showTasks();
  }
}

function showTasks() {
  let list = document.querySelector(".tasks");
  let values = JSON.parse(localStorage.getItem(localStorageName)) || [];
  list.innerHTML = "";

  values.forEach((data, index) => {
    list.innerHTML += `
      <li>
        <span>${data.name}</span>
        <div class="btn-group">
          <button onclick="openEditModal(${index})" title="Editar">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16"><path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/></svg>
          </button>
          <button onclick="deleteTask(${index})" title="Excluir">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/></svg>
          </button>
        </div>
      </li>`;
  });
}

function deleteTask(index) {
  if (confirm("Deseja apagar essa tarefa?")) {
    let values = JSON.parse(localStorage.getItem(localStorageName)) || [];
    values.splice(index, 1);
    localStorage.setItem(localStorageName, JSON.stringify(values));
    showTasks();
  }
}

// --- FUNÇÕES DO MODAL ---
function openEditModal(index) {
  let values = JSON.parse(localStorage.getItem(localStorageName)) || [];

  // Preenche o input e o campo escondido do modal
  document.querySelector("#editTaskInput").value = values[index].name;
  document.querySelector("#editTaskIndex").value = index;

  // Mostra o modal usando a API do Bootstrap
  const modalEditar = new bootstrap.Modal(
    document.getElementById("modalEditar"),
  );
  modalEditar.show();
}

function saveEdit() {
  let values = JSON.parse(localStorage.getItem(localStorageName)) || [];
  let index = document.querySelector("#editTaskIndex").value;
  let newValue = document.querySelector("#editTaskInput").value.trim();

  if (newValue) {
    values[index].name = newValue;
    localStorage.setItem(localStorageName, JSON.stringify(values));

    // Fecha o modal
    const modalElement = document.getElementById("modalEditar");
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();

    showTasks();
  } else {
    alert("A tarefa não pode estar vazia.");
  }
}

// --- TEMA ---
document.getElementById("btn-theme").addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");
  const currentTheme = body.classList.contains("dark-mode")
    ? "dark-mode"
    : "light-mode";
  localStorage.setItem("theme-preference", currentTheme);
});

// Inicialização
showTasks();
