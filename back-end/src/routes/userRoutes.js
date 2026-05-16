import { Router } from "express";
import { employeeValidation } from "../middleware/validates/employeeValidates.js";
import { validate } from "../middleware/validates/handleValidate.js";
import {
  register,
  getAllEmployees,
  getEmployee,
  deleteEmployee,
  imageUpload,
} from "../controllers/userController.js";
import roleGuard from "../middleware/roleGuard.js";
import authGuard from "../middleware/authGuard.js";
import { upload } from "../config/multer.js";

const router = Router();

router.use(authGuard);

router.post(
  "/register",
  roleGuard(["admin", "proprietario"]),
  employeeValidation(),
  validate,
  register,
);
router.get(
  "/",
  roleGuard(["admin", "proprietario", "funcionario"]),
  getAllEmployees,
);
router.get(
  "/:id",
  roleGuard(["admin", "proprietario", "funcionario"]),
  getEmployee,
);
router.delete("/:id", roleGuard(["admin", "proprietario"]), deleteEmployee);
router.patch("/upload-image", authGuard, upload.single("avatar"), imageUpload);

export default router;
