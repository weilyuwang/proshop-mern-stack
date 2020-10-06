const express = require("express");
const products = require("./data/products");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

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
