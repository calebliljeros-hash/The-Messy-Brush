import sequelize from "./config/database";
import {Item, Order, OrderItem, User} from "./models/index";

// Sample data: Item, Order, User
const seedData = async () => {
  try {
    // Sync database - force: true will drop existing tables and recreate them
    await sequelize.sync({ force: true });
    console.log("✅ Database synced (tables recreated)");

    // Create Users
    console.log("📚 Creating users...");

    const users = await User.bulkCreate([
      {
        username: "johndoe", 
        email: "johndoe@example.com", password: "password123"
      },
      {
        username: "jane Smith", 
        email: "janesmith@example.com", password: "securepass456"
      },
      {
        username: "emilyj", 
        email: "emilyj@example.com", password: "mypassword789"
      },
      {
       username: "robertlee", 
       email: "robertlee@example.com", password: "pass1234"
      },
      {
        username: "sophiab", 
        email: "sophiab@example.com", password: "abc123password"
      },
    ],
   {
    individualHooks: true, 
   }
  );
    console.log(`✅ Created ${users.length} users`);

    // Create Orders
    console.log("📚 Creating orders...");

    const orders = await Order.bulkCreate([
      {
        orderDate: new Date("2024-01-10"), userId: users[0].id, 
        status: "pending", 
        paymentMethod: "Credit Card", shippingAddress: "123 Main St, New York, NY 10001"
      },
      {
        orderDate: new Date("2024-01-12"), userId: users[2].id, 
        status: "shipped", 
        paymentMethod: "Cash", shippingAddress: "456 Oak Ave, San Jose, CA 95112"
      },
      {
        orderDate: new Date("2024-01-14"), userId: users[1].id, 
        status: "delivered", paymentMethod: "Cash", shippingAddress: "789 Pine Rd, Austin, TX 73301"
      },
      {
        orderDate: new Date("2024-01-16"), userId: users[1].id, 
        status: "cancelled", paymentMethod: "PayPal", shippingAddress: "789 Pine Rd, Austin, TX 73301"
      },
      {
        orderDate: new Date("2024-01-25"), userId: users[3].id, 
        status: "delivered", shippingAddress: "456 Pine Rd, Austin, TX 73301"
      },
      {
        orderDate: new Date("2024-01-18"), userId: users[4].id, 
        status: "pending", shippingAddress: "321 Maple Dr, Seattle, WA 98101"
      },
    ]);
    console.log("✅ orders created successfully");

    // Create Items
    console.log("📝 Creating items...");

    const items = await Item.bulkCreate([
      {
        title: "A Colorful Walk in the Park", 
        artistName: "Jane Doe", 
        medium: "Oil on Canvas", 
        price: 500, 
        imageUrl: "/A_Colorful_Walk_in_the_Park.webp",
        status: "available",
        artworkDate: new Date("2020-05-15"),
      },
      {
        title: "Bird Perching on tree",     
        artistName: "John Smith",
        medium: "Watercolor",
        price: 750,
        imageUrl: "/Bird_Perching_on_Tree.webp",
        status: "sold",
        artworkDate: new Date("2019-08-22"),
        
      },
      {
        title: "Element of Art",
        artistName: "Emily Johnson",
        medium: "Acrylic",
        price: 1200,
        imageUrl: "/Element_of_Art.webp",
        status: "reserved",
        artworkDate: new Date("2021-11-10"),
        
      },
      {
        title: "Spiral Artwork",
        artistName: "Robert Lee",
        medium: "Oil on Canvas",
        price: 950,
        imageUrl: "/Spiral_Artwork.jpg",
        status: "available",
        artworkDate: new Date("2018-03-05"),
      },
      {
        title: "Transparency",
        artistName: "Sophia Brown",
        medium: "Digital",
        price: 650,
        imageUrl: "/Transparency.webp",
        status: "sold",
        artworkDate: new Date("2022-07-19"),
        
      }
    ]);

    console.log("✅ Items created successfully");

    // Create Items
    console.log("📝 Creating items...");

    const orderItems = await OrderItem.bulkCreate([
      {
        orderId: 1,
        itemId: 1,
      },
      {
        orderId: 1,
        itemId: 2,
      },
      {
        orderId: 2,
        itemId: 3,
        quantity: 2
      },
      {
        orderId: 3,
        itemId: 4,
      },
      {
        orderId: 4,
        itemId: 3,
      },
      {
        orderId: 5,
        itemId: 3,
      },
      {
        orderId: 6,
        itemId: 5,
      },
    ]);

    //Verify the data with associations
    console.log("\n📊 Verifying data with associations...\n");

    const ordersWithUsers = await User.findAll({
      include: [
        {
          model: Order,
          as: "orders",
        },
      ],
    });

    ordersWithUsers.forEach((user: any) => {
      console.log(`👤 ${user.username}`);
      console.log(`📧 ${user.email}`);
      if (user.Order) {
        console.log(
          `🦁 Order: "${user.Order.id}" (${user.Order.orderDate})`,
        );
        console.log(`🎨 Status: ${user.Order.status}`);
      }
      console.log("");
    });

    console.log("\n📊 Verifying OrderItem associations...\n");

    const ordersWithItems = await Order.findAll({
      include: [
        {
          model: Item,
          as: "items",
          through: {
            attributes: ["quantity"],
          },
        },
      ],
    });

    ordersWithItems.forEach((order: any) => {
      console.log(`🧾 Order ID: ${order.id}`);

      if (order.items && order.items.length > 0) {
        order.items.forEach((item: any) => {
          console.log(
            `🖼️ Item ID: ${item.id} | 🔢 Quantity: ${item.OrderItem.quantity}`,
          );
        });
      } else {
        console.log("❌ No items linked to this order");
      }

      console.log("");
    });
     

    console.log("✅ Database seeded successfully!");
    console.log("🚀 You can now run: npm run dev");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
