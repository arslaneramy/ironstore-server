const express = require("express");
const usersRouter = express.Router();
const User = require("../models/user.model");
const { isLoggedIn } = require("../helpers/middleware");
const createError = require("http-errors");
const router = require("./auth.router");

// GET /api/users  - Get current user profile
usersRouter.get("/", isLoggedIn, async (req, res, next) => {
  try {
    // const logged = true;
    // const profile = true;
    const id = req.session.currentUser._id;
    let user = await User.findById(id);

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    next(createError(404));
  }
});


// GET /api/users/edit?  - Get current user to edit profile
usersRouter.get("/edit", isLoggedIn, async (req, res, next) => {
  try {
    const logged = true;
    const profile = true;

    let user = await User.findById(req.session.currentUser._id);
    //res.json
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    next(createError(404));
  }
});


// POST /api/users/edit  - Posting changes to current user profile 
usersRouter.post("/edit", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.session.currentUser._id;

    const { email, password, firstName, lastName, shippingAddress } = req.body;

    await User.findOneAndUpdate(
      id,
      {
        email,
        password,
        firstName, // example: if we add obj inside on model "name.firstName": firstName
        lastName,
        shippingAddress,
      },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    console.log(err);
    next(createError(404));
  }
});




// use /upload maybe in the future for admin

// usersRouter.get("/upload", isLoggedIn, (req, res, next) => {
//   res.json("profile/upload", { logged, profile });
// });

module.exports = usersRouter;
