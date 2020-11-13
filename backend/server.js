import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import OrderRoutes from "./routes/OrderRoutes.js";

dotenv.config();

connectDB();

const app = express();

// This will allow us to accept JSON in the body to get login
// and password for our Authentication in userContoller.js
// In other words, authUser will allow us to access req.body.email and req.body.password.
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

// Defining a path for our productRoutes
app.use("/api/products", productRoutes);
// Defining a path for our userRoutes
app.use("/api/users", userRoutes);
// Defining a path for our orderRoutes
app.user("/api/orders", orderRoutes)

// Imported middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
