import { body } from "express-validator";

const schedulingValidation = () => {
  return [
    // ======================================================
    // ID CLIENTE
    // ======================================================
    body("id_cliente")
      .notEmpty()
      .withMessage("O id_cliente é obrigatório.")
      .isInt({ min: 1 })
      .withMessage("O id_cliente deve ser um número inteiro válido."),

    // ======================================================
    // ID PET
    // ======================================================
    body("id_pet")
      .notEmpty()
      .withMessage("O id_pet é obrigatório.")
      .isInt({ min: 1 })
      .withMessage("O id_pet deve ser um número inteiro válido."),

    // ======================================================
    // ID SERVIÇO
    // ======================================================
    body("id_servico")
      .notEmpty()
      .withMessage("O id_servico é obrigatório.")
      .isInt({ min: 1 })
      .withMessage("O id_servico deve ser um número inteiro válido."),

    // ======================================================
    // DATA E HORÁRIO
    // ======================================================
    body("data_horario")
      .notEmpty()
      .withMessage("A data e horário são obrigatórios.")
      .isISO8601()
      .withMessage("A data_horario deve estar em formato válido."),

    // ======================================================
    // STATUS
    // ======================================================
    body("status")
      .optional()
      .isIn(["Pendente", "Confirmado", "Concluido", "Cancelado"])
      .withMessage("Status inválido."),
  ];
};

export default schedulingValidation;
