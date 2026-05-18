import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Scheduling = sequelize.define(
  "Scheduling",
  {
    id_agendamento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    id_pet: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    id_servico: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    data_horario: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("Pendente", "Confirmado", "Concluido", "Cancelado"),
      allowNull: false,
      defaultValue: "Pendente",
    },
  },
  {
    tableName: "agendamentos",
    timestamps: false,
  },
);

export default Scheduling;
