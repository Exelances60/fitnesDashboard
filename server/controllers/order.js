const { validationResult } = require("express-validator");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Owner = require("../models/owner");
const throwValidationError = require("../utils/throwValidationError");
const throwNotFoundError = require("../utils/throwNotFoundError");
const throwBadRequestError = require("../utils/throwBadRequestError");

exports.createOrder = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throwValidationError("Validation failed, entered data is incorrect.");
  }
  const {
    price,
    amount,
    email,
    address,
    phone,
    productId,
    creator,
    orderOwner,
  } = req.body;

  if (!productId) {
    throwNotFoundError("Product not  matched.");
  }

  let fetchedProduct;
  let fetchedOrder;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        throwNotFoundError("Product not found.");
      }

      if (amount > product.amount) {
        throwBadRequestError("The amount of product is not enough.");
      }

      if (product.amount === 0) {
        throwBadRequestError("The product is out of stock.");
      }

      fetchedProduct = product;
      product.amount = product.amount - amount;
      return product.save();
    })
    .then((result) => {
      const totalPrice = price * amount;
      const order = new Order({
        totalPrice,
        amount,
        orderOwnerEmail: email,
        adress: address,
        phone,
        productsId: productId,
        orderOwner: orderOwner,
        status: "Preparing",
        creator,
      });
      return order.save();
    })
    .then((result) => {
      fetchedOrder = result;
      return Owner.findById(creator);
    })
    .then((owner) => {
      if (!owner) {
        throwNotFoundError("Owner not found.");
      }
      owner.orders.push(fetchedOrder._id);
      return owner.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "Order created successfully!",
        order: result,
        status: 201,
      });
    });
};

exports.getOrders = (req, res, next) => {
  const ownerId = req.params.ownerId;

  if (!ownerId) {
    throwNotFoundError("Owner not found.");
  }
  let fetchOrder;

  Order.find({ creator: ownerId })
    .then((orders) => {
      if (!orders) {
        throwNotFoundError("Orders not found.");
      }
      fetchOrder = orders;
      const productsIds = orders.flatMap((order) => order.productsId);

      return Product.find({ _id: { $in: productsIds } });
    })
    .then((products) => {
      if (!products) {
        throwNotFoundError("Products not found.");
      }

      const ordersWithProducts = fetchOrder.map((order) => {
        const orderProducts = products.filter((product) =>
          order.productsId.includes(product._id.toString())
        );
        return { ...order.toObject(), products: orderProducts };
      });

      const chartsData = ordersWithProducts.map((order) => {
        return {
          name: order.products.map((product) => product.name).join(", "),
          category: order.products
            .map((product) => product.category)
            .join(", "),
          price: +order.products.map((product) => product.price).join(", "),
          amount: +order.products.map((product) => product.amount).join(", "),
          totalPrice: order.totalPrice,
          amountOrder: order.amount,
          orderId: order._id,
        };
      });

      res.status(200).json({
        message: "Fetched orders successfully.",
        orders: ordersWithProducts,
        chartsData,
      });
    })
    .catch((err) => {
      throwNotFoundError("Fetching orders failed.");
    });
};

exports.updateOrder = (req, res, next) => {
  const updatedOrder = req.body.data;
  const orderId = req.body.params.orderId;
  console.log(updatedOrder);
  Order.findByIdAndUpdate(orderId, updatedOrder).then((result) => {
    if (!result) {
      throwNotFoundError("Order not found.");
    }
    res
      .status(200)
      .json({ message: "Order updated successfully!", status: 200 });
  });
};
