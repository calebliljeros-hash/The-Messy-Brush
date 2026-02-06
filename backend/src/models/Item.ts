import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

// Define the attributes for the Item model
interface ItemAttributes {
  id: number;
  title: string;
  artistName: string;
  medium?: string;
  price: number;
  imageUrl: string;
  status: "available" | "sold" | "reserved";
  artworkDate?: Date;
  orderID?: number;
}
// Define which attributes are optional when creating a new Item
interface ItemCreationAttributes extends Optional<
  ItemAttributes,
  "id" | "medium" | "artworkDate" | "orderID"
> {}

// Define the Item model class
class Item
  extends Model<ItemAttributes, ItemCreationAttributes>
  implements ItemAttributes
{
  id!: number;
  title!: string;
  artistName!: string;
  medium!: string;
  price!: number;
  imageUrl!: string;
  status!: "available" | "sold" | "reserved";
  artworkDate!: Date;
  orderID!: number;
}

// Initialize the Item model
Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    artistName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    medium: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.ENUM("available", "sold", "reserved"),
      allowNull: false,
      defaultValue: "available",
      validate: {
        isIn: {
          args: [["available", "sold", "reserved"]],
          msg: "Status must be one of: available, sold, or reserved",
        },
      },
    },
    artworkDate: {
      type: DataTypes.DATE,
      allowNull: true, 
      validate: {
        isDate: true,
      },
    },
    orderID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: "Item",
    tableName: "items",
    timestamps: true,
  },
);


export default Item;
