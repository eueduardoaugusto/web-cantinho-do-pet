import { Router } from "express";

import schedulingValidation from "../middleware/validates/scheduling.js";
import { validate } from "../middleware/validates/handleValidate.js";

import {
  registerScheduling,
  getScheduling,
  getAllScheduling,
  updateScheduling,
  deleteScheduling,
} from "../controllers/scheduling.js";

import roleGuard from "../middleware/roleGuard.js";
import authGuard from "../middleware/authGuard.js";

const router = Router();

// ======================================================
// AUTENTICAÇÃO
// ======================================================
router.use(authGuard);

// ======================================================
// CADASTRAR AGENDAMENTO
// ======================================================
router.post(
  "/register",
  roleGuard(["admin", "proprietario"]),
  schedulingValidation(),
  validate,
  registerScheduling,
);

// ======================================================
// LISTAR TODOS AGENDAMENTOS
// ======================================================
router.get(
  "/",
  roleGuard(["admin", "proprietario", "funcionario"]),
  getAllScheduling,
);

// ======================================================
// BUSCAR AGENDAMENTO POR ID
// ======================================================
router.get(
  "/:id",
  roleGuard(["admin", "proprietario", "funcionario"]),
  getScheduling,
);

// ======================================================
// ATUALIZAR AGENDAMENTO
// ======================================================
router.put(
  "/:id",
  roleGuard(["admin", "proprietario"]),
  schedulingValidation(),
  validate,
  updateScheduling,
);

// ======================================================
// DELETAR AGENDAMENTO
// ======================================================
router.delete("/:id", roleGuard(["admin", "proprietario"]), deleteScheduling);

export default router;
