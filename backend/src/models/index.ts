import Item from "./Item";
import Order from "./Order";
import User from "./User";
import OrderItem from "./OrderItem";

Order.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});
User.hasMany(Order, {
  foreignKey: "userId",
  as: "orders",
  onDelete: "CASCADE",                                                      
});

// Order ↔ Item (Many-to-Many)
Order.belongsToMany(Item, {
  through: OrderItem,
  foreignKey: "orderId",
  otherKey: "itemId",
  as: "items",
});

Item.belongsToMany(Order, {
  through: OrderItem,
  foreignKey: "itemId",
  otherKey: "orderId",
  as: "orders",
});

// Export all models
export { Item, Order, User, OrderItem };
