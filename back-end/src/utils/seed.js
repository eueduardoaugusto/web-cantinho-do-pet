import { sequelize } from "../config/database.js";
import { encryptPassword } from "./passwordEncryption.js";
import {
  clients,
  suppliers,
  pets,
  products,
  users,
  budgets,
  sales,
  itemSolds,
  invoices,
  paymentParcels,
} from "../lib/placeholder-data.js";
import {
  Client,
  Pet,
  Product,
  Sale,
  Supplier,
  User,
  Budget,
  Invoice,
  ItemSold,
  PaymentParcel,
} from "../models/index.js";

async function seedUsers() {
  try {
    const hashedUsers = await Promise.all(
      users.map(async (data) => ({
        ...data,
        password: await encryptPassword(data.password),
      })),
    );
    const insertedUsers = await Promise.all(
      hashedUsers.map(async (user) => await User.create(user)),
    );
    console.log(`Seeded ${insertedUsers.length} users`);
    return insertedUsers;
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedSuppliers() {
  try {
    const insertedSuppliers = await Promise.all(
      suppliers.map(async (supplier) => await Supplier.create(supplier)),
    );
    console.log(`Seeded ${insertedSuppliers.length} suppliers`);
    return insertedSuppliers;
  } catch (error) {
    console.error("Error seeding suppliers:", error);
    throw error;
  }
}

async function seedClients() {
  try {
    const insertedClients = await Promise.all(
      clients.map(async (client) => await Client.create(client)),
    );
    console.log(`Seeded ${insertedClients.length} clients`);
    return insertedClients;
  } catch (error) {
    console.error("Error seeding clients:", error);
    throw error;
  }
}

async function seedPets(clientIds) {
  try {
    const insertedPets = await Promise.all(
      pets.map(async (pet, i) => {
        const client = clientIds[i];
        return await Pet.create({
          ...pet,
          client_id: client.id_cliente,
        });
      }),
    );
    console.log(`Seeded ${insertedPets.length} pets`);
    return insertedPets;
  } catch (error) {
    console.error("Error seeding pets:", error);
    throw error;
  }
}

async function seedProducts(supplierIds) {
  try {
    const productsResults = await Promise.all(
      products.map(async (product, i) => {
        const supplier = supplierIds[i];

        if (!supplier) {
          console.warn(
            `Aviso: Fornecedor não encontrado para o produto ${product.nome}. Pulando.`,
          );
          return null;
        }

        return await Product.create({
          ...product,
          id_fornecedor: supplier.id_supplier,
        });
      }),
    );

    const validInsertedProducts = productsResults.filter((p) => p !== null);

    console.log(`Seeded ${validInsertedProducts.length} products`);
    return validInsertedProducts;
  } catch (error) {
    console.error("Error seeding products:", error);
    throw error;
  }
}

async function seedBudgets(userIds, clientIds) {
  try {
    const insertedBudgets = await Promise.all(
      budgets.map(async (budget) => {
        const user = userIds[budget.userId - 1];
        const client = clientIds[budget.clientId - 1];

        return await Budget.create({
          ...budget,
          userId: user.id,
          clientId: client.id_cliente,
        });
      }),
    );
    console.log(`Seeded ${insertedBudgets.length} budgets`);
    return insertedBudgets;
  } catch (error) {
    console.error("Error seeding budgets:", error);
    throw error;
  }
}

async function seedSales(userIds, clientIds, budgetIds) {
  try {
    const insertedSales = await Promise.all(
      sales.map(async (sale) => {
        const user = userIds[sale.userId - 1];
        const client = clientIds[sale.clientId - 1];
        const budget = budgetIds[sale.budgetId - 1];

        return await Sale.create({
          ...sale,
          userId: user.id,
          clientId: client.id_cliente,
          budgetId: budget.budget_id,
        });
      }),
    );
    console.log(`Seeded ${insertedSales.length} sales`);
    return insertedSales;
  } catch (error) {
    console.error("Error seeding sales:", error);
    throw error;
  }
}

async function seedItemSolds(saleIds, productIds) {
  try {
    const insertedItems = await Promise.all(
      itemSolds.map(async (itemSold) => {
        const sale = saleIds[itemSold.saleId - 1];
        const product = productIds[itemSold.productId - 1];

        return await ItemSold.create({
          ...itemSold,
          saleId: sale.sale_id,
          productId: product.id_produto,
        });
      }),
    );
    console.log(`Seeded ${insertedItems.length} itemSolds`);
    return insertedItems;
  } catch (error) {
    console.error("Error seeding itemSolds:", error);
    throw error;
  }
}

async function seedInvoices(saleIds) {
  try {
    const insertedInvoices = await Promise.all(
      invoices.map(async (invoice) => {
        const sale = saleIds[invoice.saleId - 1];
        return await Invoice.create({
          ...invoice,
          saleId: sale.sale_id,
        });
      }),
    );
    console.log(`Seeded ${insertedInvoices.length} invoices`);
    return insertedInvoices;
  } catch (error) {
    console.error("Error seeding invoices:", error);
    throw error;
  }
}

async function seedPaymentParcels(saleIds) {
  try {
    const insertedParcels = await Promise.all(
      paymentParcels.map(async (parcel) => {
        const sale = saleIds[parcel.saleId - 1];
        return await PaymentParcel.create({
          ...parcel,
          saleId: sale.sale_id,
        });
      }),
    );
    console.log(`Seeded ${insertedParcels.length} paymentParcels`);
    return insertedParcels;
  } catch (error) {
    console.error("Error seeding paymentParcels:", error);
    throw error;
  }
}

async function main() {
  console.log("Starting database seeding...");

  const [insertedUsers, insertedSuppliers, insertedClients] = await Promise.all(
    [seedUsers(), seedSuppliers(), seedClients()],
  );

  const [insertedProducts, insertedPets, insertedBudgets] = await Promise.all([
    seedProducts(insertedSuppliers),
    seedPets(insertedClients),
    seedBudgets(insertedUsers, insertedClients),
  ]);

  const insertedSales = await seedSales(
    insertedUsers,
    insertedClients,
    insertedBudgets,
  );

  await Promise.all([
    seedItemSolds(insertedSales, insertedProducts),
    seedInvoices(insertedSales),
    seedPaymentParcels(insertedSales),
  ]);

  console.log("Database seeding complete!");
}

main()
  .catch((err) => {
    console.error(
      "An error occurred while attempting to seed the database:",
      err,
    );
  })
  .finally(() => sequelize.close());
