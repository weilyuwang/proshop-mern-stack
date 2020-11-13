import express from "express";
import dotenv from "dotenv";
import colors from "colors";

// Make sure to include .js when importing files using ES Module import syntax
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config(); // Loads .env file contents into | process.env

// Connect to DB
connectDB();

const app = express();

// middleware for parsing JSON request body
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

// Product route
app.use("/api/products", productRoutes);

// User/Authentication route
app.use("/api/users", userRoutes);

// Order route
app.use("/api/orders", orderRoutes);

// For the rest routes that are not defined above: return 404 error
app.use(notFound);

// Custom error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
