import express from "express";
import dotenv from "dotenv";
import products from "./data/products.js";

dotenv.config(); // Loads .env file contents into | process.env

const app = express();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/products", (req, res) => {
  res.json(products); // convert the list of objects into JSON
});

app.get("/api/products/:id", (req, res) => {
  // Find the product by param id
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
