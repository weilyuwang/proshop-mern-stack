// Simple middleware for handling exceptions inside of async express routes
// and passing them to your express error handlers
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc      Fetch all products
// @route     GET /api/products
// @access    Public
const getProducts = asyncHandler(async (req, res) => {
  // Returns every product we have in database
  const products = await Product.find({});

  // convert the list of objects into JSON
  res.json(products);
});

// @desc      Fetch single product by id
// @route     GET /api/products/:id
// @access    Public
const getProductById = asyncHandler(async (req, res) => {
  // Find the product by param id
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    // Will be handled by the custom error handler middleware
    throw new Error("Product not found");
  }
});

// @desc      Delete a product
// @route     DELETE /api/products/:id
// @access    Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  // Find the product by param id
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    // Will be handled by the custom error handler middleware
    throw new Error("Product not found");
  }
});

export { getProductById, getProducts, deleteProduct };
