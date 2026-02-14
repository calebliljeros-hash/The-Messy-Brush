import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

// Define the attributes for the Order model
interface OrderAttributes {
    id: number;
    orderDate?: Date;
    userId: number;
    status: "pending" | "shipped" | "delivered" | "cancelled";
    paymentMethod?: string;
    shippingAddress: string;
    feedback?: string;
}
// Define which attributes are optional when creating a new Order
interface OrderCreationAttributes extends Optional<
    OrderAttributes,
    "id" | "paymentMethod" | "feedback" | "orderDate" 
> {}

// Define the Order model class
class Order
    extends Model<OrderAttributes, OrderCreationAttributes>
    implements OrderAttributes
{
    public id!: number;
    public orderDate!: Date;
    public userId!: number;
    public status!: "pending" | "shipped" | "delivered" | "cancelled";
    public paymentMethod!: string;
    public shippingAddress!: string;
    public feedback!: string;
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
            defaultValue: new Date(),
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
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            }
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
        feedback: {
            type: DataTypes.STRING(255),
            allowNull: true,
        }
    },

    {
        sequelize,
        modelName: "Order",
        tableName: "orders",
        timestamps: true,
    },
);

export default Order;