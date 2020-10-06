const express = require("express");
const products = require("./data/products");
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

app.listen(5000, console.log("Server running on port 5000"));
