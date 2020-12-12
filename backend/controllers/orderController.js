// Simple middleware for handling exceptions inside of async express routes
// and passing them to your express error handlers
import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc      Create new order
// @route     POST /api/orders
// @access    Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(200).json(createdOrder);
  }
});

// @desc      Get order by IDr
// @route     GET /api/orders/:id
// @access    Private
const getOrderById = asyncHandler(async (req, res) => {
  // We also need user's info (name and email)
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

// @desc      Update order to paid
// @route     PUT /api/orders/:id/pay
// @access    Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  // Find the order
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();

    // The info below comes from paypal
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

// @desc      Update order to delivered
// @route     PUT /api/orders/:id/deliver
// @access    Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  // Find the order
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

// @desc      Get logged in user orders
// @route     GET /api/orders/myorders
// @access    Private
const getMyOrders = asyncHandler(async (req, res) => {
  // Find the orders that belong to the logged in user
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc      Get all orders
// @route     GET /api/orders
// @access    Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  // Find all orders and populate the its user id & user name for each order
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
};
