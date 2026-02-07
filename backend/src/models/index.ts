import Item from "./Item";
import Order from "./Order";
import User from "./User";

Order.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});
User.hasMany(Order, {
  foreignKey: "userId",
  as: "orders",
  onDelete: "CASCADE",                                                      
});
Item.belongsTo(Order, {
  foreignKey: "orderId",
  as: "order",
});
Order.hasMany(Item, {
  foreignKey: "orderId",
  as: "items",
  onDelete: "CASCADE",
});

// Export all models
export { Item, Order, User };
