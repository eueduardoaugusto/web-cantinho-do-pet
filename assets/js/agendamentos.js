// ======================================================
// agendamentos.js
// ======================================================

// ======================================================
// API
// ======================================================
const API_URL = "http://localhost:3000/api/scheduling";

// ======================================================
// ELEMENTOS
// ======================================================
const horariosList = document.getElementById("horariosList");

const retiradaList = document.getElementById("retiradaList");

const currentDate = document.getElementById("currentDate");

const btnNovoAgendamento = document.getElementById("btnNovoAgendamento");

const btnAtualizarRetirada = document.getElementById("btnAtualizarRetirada");

const prevDateBtn = document.querySelectorAll(".date-navigation button")[0];

const nextDateBtn = document.querySelectorAll(".date-navigation button")[1];

// ======================================================
// DATA SELECIONADA
// ======================================================
let selectedDate = new Date();

// ======================================================
// FORMATAR DATA YYYY-MM-DD
// ======================================================
function formatDateToCompare(date) {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// ======================================================
// EXTRAIR DATA MYSQL
// ======================================================
function getMysqlDate(dateString) {
  if (!dateString) return "";

  return new Date(dateString).toISOString().split("T")[0];
}

// ======================================================
// RENDER DATA
// ======================================================
function renderCurrentDate() {
  currentDate.innerText = selectedDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

renderCurrentDate();

// ======================================================
// FORMATAR HORÁRIO
// ======================================================
function formatTime(dateString) {
  if (!dateString) return "--:--";

  const date = new Date(dateString);

  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ======================================================
// TAG SERVIÇO
// ======================================================
function getServiceTag(serviceName) {
  if (!serviceName) return "SV";

  const words = serviceName.split(" ");

  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }

  return words
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

// ======================================================
// LOAD API
// ======================================================
async function loadScheduling() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },

      credentials: "include",
    });

    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("API não retornou JSON");
    }

    const data = await response.json();

    console.log("AGENDAMENTOS:", data);

    if (!response.ok) {
      throw new Error(data.errors?.[0] || "Erro ao carregar");
    }

    renderScheduling(data.scheduling);
  } catch (error) {
    console.error(error);

    horariosList.innerHTML = `
      <div class="empty-message">
        ${error.message}
      </div>
    `;
  }
}

// ======================================================
// RENDER AGENDAMENTOS
// ======================================================
function renderScheduling(schedulingList) {
  horariosList.innerHTML = "";

  if (!schedulingList || schedulingList.length === 0) {
    horariosList.innerHTML = `
      <div class="empty-message">
        Nenhum agendamento encontrado.
      </div>
    `;

    return;
  }

  // ==========================================
  // DATA ESCOLHIDA
  // ==========================================
  const selectedDateString = formatDateToCompare(selectedDate);

  // ==========================================
  // FILTRAR MESMO DIA
  // ==========================================
  const filteredList = schedulingList.filter((item) => {
    if (!item.data_horario) return false;

    const mysqlDate = getMysqlDate(item.data_horario);

    return (
      mysqlDate === selectedDateString &&
      item.status?.toLowerCase() === "pendente"
    );
  });
  // ==========================================
  // SEM AGENDAMENTOS
  // ==========================================
  if (filteredList.length === 0) {
    horariosList.innerHTML = `
    <div class="empty-message">
      Nenhum agendamento nesta data.
    </div>
  `;
  } else {
    // ==========================================
    // RENDER
    // ==========================================
    filteredList.forEach((item) => {
      const clienteNome = item.cliente?.nome || item.cliente?.name || "Cliente";

      const petNome = item.pet?.pet_name || item.pet?.nome_pet || "Pet";

      const servicoNome =
        item.servico?.nome || item.servico?.nome_produto || "Serviço";

      const horario = formatTime(item.data_horario);

      const tag = getServiceTag(servicoNome);

      const html = `
      <div class="horario-item">

          <div class="time">
              <span>${horario}</span>
          </div>

          <div class="pet-tag">
              ${tag}
          </div>

          <div class="cliente">
              ${clienteNome} (${petNome})
          </div>

          <button
            class="more-btn delete-btn"
            data-id="${item.id_agendamento}"
          >
              <i class="fa-solid fa-trash"></i>
          </button>

      </div>
    `;

      horariosList.innerHTML += html;
    });

    setupDeleteButtons();
  }
  renderRetirada(schedulingList);

  // ==========================================
  // RENDER
  // ==========================================
  filteredList.forEach((item) => {
    const clienteNome = item.cliente?.nome || item.cliente?.name || "Cliente";

    const petNome = item.pet?.pet_name || item.pet?.nome_pet || "Pet";

    const servicoNome =
      item.servico?.nome || item.servico?.nome_produto || "Serviço";

    const horario = formatTime(item.data_horario);

    const tag = getServiceTag(servicoNome);

    const html = `
      <div class="horario-item">

          <div class="time">
              <span>${horario}</span>
          </div>

          <div class="pet-tag">
              ${tag}
          </div>

          <div class="cliente">
              ${clienteNome} (${petNome})
          </div>

          <button
            class="more-btn delete-btn"
            data-id="${item.id_agendamento}"
          >
              <i class="fa-solid fa-trash"></i>
          </button>

      </div>
    `;

    horariosList.innerHTML += html;
  });

  setupDeleteButtons();

  renderRetirada(schedulingList);
}

// ======================================================
// RETIRADA
// ======================================================
function renderRetirada(schedulingList) {
  retiradaList.innerHTML = "";

  const confirmado = schedulingList.filter(
    (item) => item.status === "Confirmado",
  );

  if (confirmado.length === 0) {
    retiradaList.innerHTML = `
      <div class="empty-message">
        Nenhum pet aguardando retirada.
      </div>
    `;

    return;
  }

  confirmado.forEach((item) => {
    const petNome = item.pet?.pet_name || item.pet?.nome_pet || "Pet";

    const clienteNome = item.cliente?.nome || item.cliente?.name || "Cliente";

    const html = `
      <div class="pet-card">

          <img
            src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
            alt="Pet"
          >

          <div class="pet-info">

              <h3>${petNome}</h3>

              <p>${clienteNome}</p>

              <span>
                Pronto para retirada
              </span>

          </div>

      </div>
    `;

    retiradaList.innerHTML += html;
  });
}

// ======================================================
// DELETE
// ======================================================
function setupDeleteButtons() {
  const deleteButtons = document.querySelectorAll(".delete-btn");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.dataset.id;

      const confirmDelete = confirm("Deseja deletar este agendamento?");

      if (!confirmDelete) return;

      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",

          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.errors?.[0] || "Erro ao deletar");
        }

        alert("Agendamento deletado!");

        loadScheduling();
      } catch (error) {
        console.error(error);

        alert(error.message);
      }
    });
  });
}

// ======================================================
// NAVEGAR DATAS
// ======================================================
prevDateBtn.addEventListener("click", () => {
  selectedDate.setDate(selectedDate.getDate() - 1);

  renderCurrentDate();

  loadScheduling();
});

nextDateBtn.addEventListener("click", () => {
  selectedDate.setDate(selectedDate.getDate() + 1);

  renderCurrentDate();

  loadScheduling();
});

// ======================================================
// BOTÃO NOVO AGENDAMENTO
// ======================================================
if (btnNovoAgendamento) {
  btnNovoAgendamento.addEventListener("click", () => {
    window.location.href = "/pages/novoAgendamento.html";
  });
}

// ======================================================
// RETIRADA
// ======================================================
if (btnAtualizarRetirada) {
  btnAtualizarRetirada.addEventListener("click", () => {
    alert("Função em desenvolvimento");
  });
}

// ======================================================
// INIT
// ======================================================
loadScheduling();
