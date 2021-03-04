const express = require("express");
const productsRouter = express.Router();
const Product = require("../models/product.model");
const { isLoggedIn } = require("../helpers/middleware");
const createError = require("http-errors");

// This router is included as a boilerplate example

// GET /api/products
productsRouter.get("/", async (req, res, next) => {
  try {
    const results = await Product.find();
    res.json(results);
  } catch (err) {
    console.log(err);
    next(createError(400));
  }
});

productsRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    res.json(product);
  } catch (err) {
    console.log(err);
    next(createError(400));
  }
});

module.exports = productsRouter;
