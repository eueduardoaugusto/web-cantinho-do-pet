import { Scheduling, Product, Client, Pet } from "../models/index.js";

export async function registerScheduling(req, res) {
  const { id_cliente, id_pet, id_servico, data_horario, status } = req.body;

  try {
    const newScheduling = await Scheduling.create({
      id_cliente,
      id_pet,
      id_servico,
      data_horario,
      status,
    });

    return res.status(201).json({
      message: "Agendamento cadastrado com sucesso",
      scheduling: newScheduling,
    });
  } catch (error) {
    console.error("Ocorreu um erro:", error);

    return res.status(500).json({
      errors: ["Ocorreu um erro. Por favor, tente novamente mais tarde."],
    });
  }
}

export async function getAllScheduling(req, res) {
  try {
    const scheduling = await Scheduling.findAll({
      include: [
        {
          model: Product,
          as: "servico",
          required: false,
        },
        {
          model: Client,
          as: "cliente",
          required: false,
        },
        {
          model: Pet,
          as: "pet",
          required: false,
        },
      ],
    });

    return res.status(200).json({
      scheduling,
    });
  } catch (error) {
    console.error("Ocorreu um erro:", error);

    return res.status(500).json({
      errors: ["Ocorreu um erro. Por favor, tente novamente mais tarde."],
    });
  }
}

export async function getScheduling(req, res) {
  const { id } = req.params;

  try {
    const scheduling = await Scheduling.findByPk(id, {
      include: [
        {
          model: Product,
          as: "servico",
          required: false,
        },
        {
          model: Client,
          as: "cliente",
          required: false,
        },
        {
          model: Pet,
          as: "pet",
          required: false,
        },
      ],
    });

    if (!scheduling) {
      return res.status(404).json({
        errors: ["Agendamento não encontrado"],
      });
    }

    return res.status(200).json({
      scheduling,
    });
  } catch (error) {
    console.error("Ocorreu um erro:", error);

    return res.status(500).json({
      errors: ["Ocorreu um erro. Por favor, tente novamente mais tarde."],
    });
  }
}

export async function updateSchedulingStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const scheduling = await Scheduling.findByPk(id);

    if (!scheduling) {
      return res.status(404).json({
        errors: ["Agendamento não encontrado"],
      });
    }

    await scheduling.update({
      status,
    });

    return res.status(200).json({
      message: "Status atualizado com sucesso",
      scheduling,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      errors: ["Erro ao atualizar status"],
    });
  }
}
export async function deleteScheduling(req, res) {
  const { id } = req.params;

  try {
    const scheduling = await Scheduling.findByPk(id);

    if (!scheduling) {
      return res.status(404).json({
        errors: ["Agendamento não encontrado"],
      });
    }

    await scheduling.destroy();

    return res.status(200).json({
      message: "Agendamento deletado com sucesso",
    });
  } catch (error) {
    console.error("Ocorreu um erro:", error);

    return res.status(500).json({
      errors: ["Ocorreu um erro. Por favor, tente novamente mais tarde."],
    });
  }
}
