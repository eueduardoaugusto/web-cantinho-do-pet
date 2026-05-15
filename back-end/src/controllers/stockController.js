import { Product as Produto } from "../models/index.js";

// ================================
// LISTAR ESTOQUE
// ================================
export const listarEstoque = async (req, res) => {
  try {
    const produtos = await Produto.findAll({
      attributes: [
        "id_produto",
        "codigo",
        "nome",
        "preco",
        "tamanho",
        "quantidade",
      ],
    });

    res.status(200).json(produtos);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      erro: "Erro ao listar estoque",
    });
  }
};

// ================================
// ALTERAR QUANTIDADE
// ================================
export const atualizarQuantidade = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantidade } = req.body;

    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(404).json({
        mensagem: "Produto não encontrado",
      });
    }

    produto.quantidade = quantidade;

    await produto.save();

    res.status(200).json({
      mensagem: "Estoque atualizado com sucesso",
      produto,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      erro: "Erro ao atualizar estoque",
    });
  }
};