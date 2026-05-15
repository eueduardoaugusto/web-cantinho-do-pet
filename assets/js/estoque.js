const tbody = document.querySelector("tbody");

const token = localStorage.getItem("token");

async function carregarEstoque() {
  try {
    const response = await fetch("http://localhost:3000/api/estoque", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const produtos = await response.json();

    tbody.innerHTML = "";

    produtos.forEach((produto) => {
      tbody.innerHTML += `
        <tr>
          <td>${produto.codigo || "-"}</td>
          <td>${produto.nome || "-"}</td>
          <td>R$ ${produto.preco || "0.00"}</td>
          <td>${produto.tamanho || "-"}</td>
          <td>${produto.quantidade || 0}</td>

          <td>
            <button 
              class="btn-atualizar"
              onclick="alterarQuantidade(${produto.id_produto}, ${produto.quantidade || 0})"
            >
              Alterar
            </button>
          </td>
        </tr>
      `;
    });
  } catch (error) {
    console.error("Erro ao carregar estoque:", error);
  }
}

async function alterarQuantidade(id, quantidadeAtual) {
  const novaQuantidade = prompt(
    "Digite a nova quantidade:",
    quantidadeAtual
  );

  if (novaQuantidade === null) return;

  try {
    const response = await fetch(
      `http://localhost:3000/api/estoque/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quantidade: Number(novaQuantidade),
        }),
      }
    );

    const data = await response.json();

    alert(data.mensagem);

    carregarEstoque();
  } catch (error) {
    console.error(error);
  }
}

carregarEstoque();