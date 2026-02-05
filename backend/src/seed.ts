import sequelize from './config/database';
import Item from "./models/Item";
import Order from "./models/Order";
import User from "./models/User";

// Sample data: Item, Order, User
const seedData = async () => {
  try {
    // Sync database - force: true will drop existing tables and recreate them
    await sequelize.sync({ force: true });
    console.log("✅ Database synced (tables recreated)");

    // Create Items
    console.log("📝 Creating items...");

    const artwork1 = await Item.create({
      title: "A Colorful Walk in the Park",
      artistName: "Jane Doe",
      medium: "Oil on Canvas",
      price: 500,
      imageUrl: "/images/A_Colorful_Walk_in_the_Park.webp",
      status: "available",
      artworkDate: new Date("2020-05-15"),
    });

    const artwork2 = await Item.create({
      title: "Bird Perching on Tree",
      artistName: "John Smith",
      medium: "Watercolor",
      price: 750,
      imageUrl: "/images/Bird_Perching_on_Tree.webp",
      status: "sold",
      artworkDate: new Date("2019-08-22"),
    });

    const artwork3 = await Item.create({
      title: "Element of Art",
      artistName: "Emily Johnson",
      medium: "Acrylic",
      price: 1200,
      imageUrl: "/images/Element_of_Art.webp",
      status: "reserved",
      artworkDate: new Date("2021-11-10"),
    });

    const artwork4 = await Item.create({
      title: "Spiral Artwork",
      artistName: "Robert Lee",
      medium: "Oil on Canvas",
      price: 950,
      imageUrl: "/images/Spiral_Artwork.jpg",
      status: "available",
      artworkDate: new Date("2018-03-05"),
    });

    const artwork5 = await Item.create({
      title: "Transparency",
      artistName: "Sophia Brown",
      medium: "Digital",
      price: 650,
      imageUrl: "/images/Transparency.webp",
      status: "available",
      artworkDate: new Date("2022-07-19"),
    });

    console.log("✅ Items created successfully");

    // Create Users
    console.log("📚 Creating users...");

    const user1 = await User.create({
      username: "johndoe",
      email: "johndoe@example.com",
      password: "password123",
    });

    const user2 = await User.create({
      username: "janesmith",
      email: "janesmith@example.com",
      password: "securepass456",
    });

    const user3 = await User.create({
      username: "emilyj",
      email: "emilyj@example.com",
      password: "mypassword789",
    });

    const user4 = await User.create({
      username: "robertlee",
      email: "robertlee@example.com",
      password: "pass1234",
    });

    const user5 = await User.create({
      username: "sophiab",
      email: "sophiab@example.com",
      password: "abc123password",
    });
    console.log("✅ Users created successfully");

    // Create Orders
    console.log("📚 Creating orders...");

     const order1 = await Order.create({
       orderDate: new Date("2024-01-10"),
       userId: 1,
       status: "pending",
       paymentMethod: "Credit Card",
       shippingAddress: "123 Main St, New York, NY 10001",
     });

     const order2 = await Order.create({
       orderDate: new Date("2024-01-12"),
       userId: 2,
       status: "shipped",
       paymentMethod: "Cash",
       shippingAddress: "456 Oak Ave, San Jose, CA 95112",
     });

     const order3 = await Order.create({
       orderDate: new Date("2024-01-15"),
       userId: 3,
       status: "delivered",
       paymentMethod: "Debit Card",
       shippingAddress: "789 Pine Rd, Austin, TX 73301",
     });

     const order4 = await Order.create({
       orderDate: new Date("2024-01-18"),
       userId: 1,
       status: "cancelled",
       paymentMethod: "Credit Card",
       shippingAddress: "123 Main St, New York, NY 10001",
     });

     const order5 = await Order.create({
       orderDate: new Date("2024-01-20"),
       userId: 4,
       status: "pending",
       shippingAddress: "321 Maple Dr, Seattle, WA 98101",
     });

     console.log("✅ orders created successfully");

    // Verify the data with associations
    console.log("\n📊 Verifying data with associations...\n");

    const authorsWithBooks = await Author.findAll({
      include: [Book],
    });

    authorsWithBooks.forEach((author: any) => {
      console.log(`👤 ${author.name}`);
      console.log(`   📧 ${author.email}`);
      if (author.Book) {
        console.log(
          `   📖 Book: "${author.Book.title}" (${author.Book.publishedYear})`,
        );
        console.log(`   📘 ISBN: ${author.Book.isbn}`);
      }
      console.log("");
    });

    console.log("✅ Database seeded successfully!");
    console.log("🚀 You can now run: npm run dev");

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
