// Middleware for handling exceptions inside of async express routes, passing them to you or to your error handlers(simplification for try and catch method)
import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc Create new order
// @route  POST api/orders
// @access Private
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
    // Bad request
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      // We also want to bring the user. Because we want to attach the logged-in user to our order, and because
      // this is going to be a protected route. Also, we will be able to get a token and user id from the token.
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    // Save to the DB.
    const createdOrder = await order.save();
    // Successfully created status. Show the createdOrder info.
    res.status(201).json(createdOrder);
  }
});

// @desc Get order by ID
// @route  GET api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  // In addition to order information, we also need to bring user's name and email associated with that order.
  // .populate explanation https://stackoverflow.com/questions/38051977/what-does-populate-in-mongoose-mean/53002303.
  // Simple explanation, .populate() will bring only needed information from the object.
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Update order to paid
// @route  PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    // false by default.
    order.isPaid = true;
    order.paidAt = Date.now();
    // This is coming from the PayPal API.
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_adress: req.body.payer.email_adress,
    };
    // Save all info into updatedOrder, which will be stored in the DB.
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Update order to delivered
// @route  PUT /api/orders/:id/delivered
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    // false by default.
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    // Save all info into updatedOrder, which will be stored in the DB.
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc Get logged-in user orders
// @route  GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  // user: req.user._id (only logged in user.)
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc Get all orders
// @route  GET /api/orders/
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  // Passing an empty object in order to find all objects.
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
