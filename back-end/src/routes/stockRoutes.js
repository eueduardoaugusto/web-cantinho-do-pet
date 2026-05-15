import express from "express";

import {
  listarEstoque,
  atualizarQuantidade,
} from "../controllers/stockController.js";

import authGuard from "../middleware/authGuard.js";

const router = express.Router();

router.use(authGuard);

// LISTAR
router.get("/", listarEstoque);

// ALTERAR QUANTIDADE
router.put("/:id", atualizarQuantidade);

export default router;