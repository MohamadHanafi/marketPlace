import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
const stripe = new Stripe(
  'sk_test_51J7EykGHksnS4US2QxEKkypH8G7pw447MLGH01Qa7Q7RffVOZmtPBoF5iEDq26QwnL6UYLWYmcTbSPo57I38yuOy0089Pymomd'
);
import Order from '../models/orderModel.js';

// @desc    create new order
// @route    POST /api/orders
// @access    Private

const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    ItemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('no order items');
    return;
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      ItemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    get order by id
// @route    get /api/orders/:id
// @access    Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('order does not exist');
  }
});

// @desc    pay order route (stripe)
// @route    post /api/orders/:id/pay
// @access    public
const createPaymentIntent = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    const amount = order.totalPrice * 100;
    const currency = 'usd';
    const receipt_email = order.user.email;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      receipt_email,
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } else {
    res.status(404);
    throw new Error('order does not exist');
  }
});

// @desc    update order to paid
// @route    get /api/orders/:id/pay
// @access    Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.receipt_email,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('order does not exist');
  }
});

// @desc    get logged in user orders
// @route    get /api/orders/myorders
// @access    Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

export {
  createOrder,
  getOrderById,
  createPaymentIntent,
  updateOrderToPaid,
  getMyOrders,
};
