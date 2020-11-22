import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

connectDB();

const app = express();

// Activate morgan in a developement mode. (Gives us more info about requests in dev mode).
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

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
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// Connecting to the PayPal API
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// Since __dirname is only available in a plain JavaScript, we need to mimic it.
const __dirname = path.resolve();

// /uploads folder is not being accessible by default in order to upload images.
// Therefore, we need to make it a static folder, so that it can get loaded in the browser.
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

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
