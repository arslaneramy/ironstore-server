const express = require("express");
const cartRouter = express.Router();
const User = require("../models/user.model");
const { isLoggedIn } = require("../helpers/middleware");
const createError = require("http-errors");

cartRouter.get("/", isLoggedIn, (req, res, next) => {
  User.findById(req.session.currentUser._id)
    .populate("cart.product")
    .then((updatedUser) => {
      res.json(updatedUser.cart);
    })
    .catch((err) => next(createError(err)));
});

// DELETE /api/users/cart/:productId
cartRouter.delete("/:productId", isLoggedIn, (req, res, next) => {
  const { _id } = req.session.currentUser;
  const { productId } = req.params;

  User.findByIdAndUpdate(
    _id,
    { $pull: { cart: { product: productId } } },
    { new: true }
  )
    .populate("cart.product")
    .then((updatedUser) => {
      res.send(updatedUser);
    })
    .catch((err) => next(createError(err)));
});

// PUT /api/users/cart
cartRouter.put("/", isLoggedIn, (req, res, next) => {
  const { qty, productId } = req.body;
  const { _id } = req.session.currentUser;

  const cartProduct = {
    product: productId,
    qty: qty,
  };

  User.findByIdAndUpdate(_id, { $push: { cart: cartProduct } }, { new: true })
    .populate("cart.product")
    .then((updatedUser) => {
      res.send(updatedUser);
    })
    .catch((err) => next(createError(err)));
});

module.exports = cartRouter;