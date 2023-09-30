import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _customers from "./customers.js";
import { Sequelize } from "sequelize";
import _order_detail from "./order_detail.js";
import _orders from "./orders.js";
import _product from "./product.js";
import _productcategory from "./productcategory.js";
import _users from "./users.js";

const sequelize = new Sequelize(process.env.DB_NM, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

function initModels(sequelize) {
  const customers = _customers.init(sequelize, DataTypes);
  const order_detail = _order_detail.init(sequelize, DataTypes);
  const orders = _orders.init(sequelize, DataTypes);
  const product = _product.init(sequelize, DataTypes);
  const productcategory = _productcategory.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  order_detail.belongsTo(orders, { as: "order", foreignKey: "order_id" });
  orders.hasMany(order_detail, { as: "order_details", foreignKey: "order_id" });
  order_detail.belongsTo(product, { as: "product", foreignKey: "product_id" });
  product.hasMany(order_detail, { as: "order_details", foreignKey: "product_id" });
  product.belongsTo(productcategory, { as: "category", foreignKey: "categoryid" });
  productcategory.hasMany(product, { as: "products", foreignKey: "categoryid" });
  customers.belongsTo(users, { as: "user", foreignKey: "userid" });
  users.hasMany(customers, { as: "customers", foreignKey: "userid" });
  orders.belongsTo(users, { as: "user", foreignKey: "userid" });
  users.hasMany(orders, { as: "orders", foreignKey: "userid" });

  return {
    customers,
    order_detail,
    orders,
    product,
    productcategory,
    users,
  };
}

const models = initModels(sequelize);
export default models;
export { sequelize };
