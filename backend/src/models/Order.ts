import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import User from "./User";
import Item from "./Item";

// Define the attributes for the Order model
interface OrderAttributes {
  id: number;
  orderDate: Date;
  userId: number;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  paymentMethod?: string;
  shippingAddress: string;
}
// Define which attributes are optional when creating a new Order
interface OrderCreationAttributes extends Optional<
  OrderAttributes,
  "id" | "paymentMethod"
> {}

// Define the Order model class
class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  id!: number;
  orderDate!: Date;
  userId!: number;
  status!: "pending" | "shipped" | "delivered" | "cancelled";
  paymentMethod!: string;
  shippingAddress!: string;
}

// Initialize the Order model
Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isNotFuture(value: Date) {
          if (value > new Date()) {
            throw new Error("orderDate cannot be in the future");
          }
        },
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: User, key: "id" },
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "shipped", "delivered", "cancelled"),
      defaultValue: "pending",
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    shippingAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    sequelize,
    modelName: "Order",
    tableName: "orders",
    timestamps: true,
  },
);

// Define associations

Order.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});
User.hasMany(Order, {
  foreignKey: "userId",
  as: "orders",
});
Order.hasMany(Item, {
  foreignKey: "orderId",
  as: "items",
});
Item.belongsTo(Order, {
  foreignKey: "orderId",
  as: "order",
});

export default Order;
