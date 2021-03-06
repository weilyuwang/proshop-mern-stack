import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import path from "path";

// Make sure to include .js when importing files using ES Module import syntax
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config(); // Loads .env file contents into | process.env

// Connect to DB
connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// middleware for parsing JSON request body
app.use(express.json());

// Product route
app.use("/api/products", productRoutes);

// User/Authentication route
app.use("/api/users", userRoutes);

// Order route
app.use("/api/orders", orderRoutes);

// Upload route
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// make uploads/ directory static/public
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Production env
if (process.env.NODE_ENV === "production") {
  // Make /build static
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  // Serve /build/index.html
  app.get(
    "*",
    (req, res) =>
      // res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
      res.sendFile(path.join(__dirname, "frontend/build/index.html")) // same as above
  );
} else {
  // Development env
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

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
