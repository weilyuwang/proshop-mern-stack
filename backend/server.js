import express from "express";
import dotenv from "dotenv";
import colors from "colors";

// Make sure to include .js when importing files using ES Module import syntax
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";

dotenv.config(); // Loads .env file contents into | process.env

// Connect to DB
connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
