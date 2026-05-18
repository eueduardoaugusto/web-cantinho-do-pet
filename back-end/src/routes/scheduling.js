import { Router } from "express";

import schedulingValidation from "../middleware/validates/scheduling.js";
import { validate } from "../middleware/validates/handleValidate.js";

import {
  registerScheduling,
  getScheduling,
  getAllScheduling,
  updateSchedulingStatus,
  deleteScheduling,
} from "../controllers/scheduling.js";

import roleGuard from "../middleware/roleGuard.js";
import authGuard from "../middleware/authGuard.js";

const router = Router();
router.use(authGuard);

router.post(
  "/register",
  roleGuard(["admin", "proprietario"]),
  schedulingValidation(),
  validate,
  registerScheduling,
);

router.get(
  "/",
  roleGuard(["admin", "proprietario", "funcionario"]),
  getAllScheduling,
);

router.get(
  "/:id",
  roleGuard(["admin", "proprietario", "funcionario"]),
  getScheduling,
);

router.patch(
  "/status/:id",
  roleGuard(["admin", "proprietario"]),
  updateSchedulingStatus,
);

router.delete("/:id", roleGuard(["admin", "proprietario"]), deleteScheduling);

export default router;
