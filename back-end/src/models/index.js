import Client from "./client.js";
import User from "./user.js";
import Supplier from "./supplier.js";
import Product from "./products.js";
import Sale from "./sale.js";
import ItemSold from "./saleItem.js";
import Budget from "./budget.js";
import Invoice from "./invoces.js";
import PaymentParcel from "./paymentParcel.js";
import Pet from "./pets.js";
import Setor from "./setor.js";
import Grupos from "./groups.js";
import Scheduling from "./scheduling.js";

// =========================
// CLIENTE -> PET
// =========================
Client.hasMany(Pet, {
  foreignKey: "id_cliente",
});

Pet.belongsTo(Client, {
  foreignKey: "id_cliente",
});

// =========================
// CLIENTE -> VENDA
// =========================
Client.hasMany(Sale, {
  foreignKey: "id_cliente",
});

Sale.belongsTo(Client, {
  foreignKey: "id_cliente",
});

// =========================
// USUARIO -> VENDA
// =========================
User.hasMany(Sale, {
  foreignKey: "id_usuario",
});

Sale.belongsTo(User, {
  foreignKey: "id_usuario",
});

// =========================
// FORNECEDOR -> PRODUTO
// =========================
Supplier.hasMany(Product, {
  foreignKey: "id_fornecedor",
});

Product.belongsTo(Supplier, {
  foreignKey: "id_fornecedor",
});

// =========================
// PRODUTO -> ITEM VENDA
// =========================
Product.hasMany(ItemSold, {
  foreignKey: "id_produto",
});

ItemSold.belongsTo(Product, {
  foreignKey: "id_produto",
});

// =========================
// VENDA -> ITEM VENDA
// =========================
Sale.hasMany(ItemSold, {
  foreignKey: "id_venda",
});

ItemSold.belongsTo(Sale, {
  foreignKey: "id_venda",
});

// =========================
// ORÇAMENTO -> VENDA
// =========================
Budget.hasOne(Sale, {
  foreignKey: "id_orcamento",
});

Sale.belongsTo(Budget, {
  foreignKey: "id_orcamento",
});

// =========================
// VENDA -> NOTA FISCAL
// =========================
Sale.hasOne(Invoice, {
  foreignKey: "id_venda",
});

Invoice.belongsTo(Sale, {
  foreignKey: "id_venda",
});

// =========================
// VENDA -> PARCELAS
// =========================
Sale.hasMany(PaymentParcel, {
  foreignKey: "id_venda",
});

PaymentParcel.belongsTo(Sale, {
  foreignKey: "id_venda",
});

// =========================
// CLIENTE -> ORÇAMENTO
// =========================
Client.hasMany(Budget, {
  foreignKey: "id_cliente",
});

Budget.belongsTo(Client, {
  foreignKey: "id_cliente",
});

Budget.belongsTo(User, {
  foreignKey: "id_usuario",
});

// =========================
// VENDA -> NOTAS
// =========================
Invoice.belongsTo(Sale, {
  foreignKey: "id_venda",
});

Sale.hasMany(Invoice, {
  foreignKey: "id_venda",
});

// ======================================================
// AGENDAMENTOS
// ======================================================

// CLIENTE -> AGENDAMENTO
Client.hasMany(Scheduling, {
  foreignKey: "id_cliente",
});

Scheduling.belongsTo(Client, {
  foreignKey: "id_cliente",
  as: "cliente",
});

// PET -> AGENDAMENTO
Pet.hasMany(Scheduling, {
  foreignKey: "id_pet",
});

Scheduling.belongsTo(Pet, {
  foreignKey: "id_pet",
  as: "pet",
});

// PRODUTO/SERVIÇO -> AGENDAMENTO
Product.hasMany(Scheduling, {
  foreignKey: "id_servico",
});

Scheduling.belongsTo(Product, {
  foreignKey: "id_servico",
  as: "servico",
});

export {
  Client,
  User,
  Supplier,
  Product,
  Sale,
  ItemSold,
  Budget,
  Invoice,
  PaymentParcel,
  Pet,
  Setor,
  Grupos,
  Scheduling,
};
