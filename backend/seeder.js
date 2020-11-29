import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clear all three collection before taking the model
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Passing data from users to our User model
    // Array of the created users
    const createdUsers = await User.insertMany(users);

    // Appending admin to our array of users
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      // Return everything what is inside of the products already, and adminUser info.
      return { ...product, user: adminUser };
    });

    // Fire our products appendment
    await Product.insertMany(sampleProducts);

    console.log("Data Imported".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Clear all three collection before taking the model
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

// Destroy passed data if the passed value equals to -d(delete)
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
//
