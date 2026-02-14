import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface OrderItemAttributes {
  orderId: number;
  itemId: number;
  quantity: number;
}
interface OrderItemCreationAttributes extends Optional<
  OrderItemAttributes,
  "quantity"
> {}
class OrderItem
  extends Model<OrderItemAttributes>
  implements OrderItemAttributes
{
  public orderId!: number;
  public itemId!: number;
  public quantity!: number;
}

OrderItem.init(
  {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "orders",
        key: "id",
      },
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "items",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
      },
    },
  },
  {
    sequelize,
    modelName: "OrderItem",
    tableName: "order_items",
    timestamps: false,
  },
);

export default OrderItem;
