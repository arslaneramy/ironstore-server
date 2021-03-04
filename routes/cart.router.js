const express = require("express");
const cartRouter = express.Router();
const Cart = require("../models/product.model");
const { isLoggedIn } = require("../helpers/middleware");
const createError = require("http-errors");
const router = require("./auth.router");



cartRouter.get("/")