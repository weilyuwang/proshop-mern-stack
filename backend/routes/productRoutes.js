import express from "express";
import Product from "../models/productModel.js";

// Simple middleware for handling exceptions inside of async express routes
// and passing them to your express error handlers
import asyncHandler from "express-async-handler";

const router = express.Router();

// @desc      Fetch all products
// @route     GET /api/products
// @access    Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({}); // Returns every product we have in database
    res.json(products); // convert the list of objects into JSON
  })
);

// @desc      Fetch single product by id
// @route     GET /api/products/:id
// @access    Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    // Find the product by param id
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found"); // Will be handled by the custom error handler middleware
    }
  })
);

export default router;
