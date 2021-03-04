const express = require("express");
const usersRouter = express.Router();
const User = require("../models/user.model");
const { isLoggedIn } = require("../helpers/middleware");
const createError = require("http-errors");
const router = require("./auth.router");

//profile
usersRouter.get("/", isLoggedIn, async (req,res,next) =>{
    try{
        // const logged = true;
        // const profile = true;
        const id = req.session.currentUser._id;
        let user = await User.findById(id);
        res.json(user);
   } catch (err) {
       console.log(err)
       next(createError(404));
   }
   
});

//edit
usersRouter.get("/edit", isLoggedIn, async (req,res,next) => {
    try {
        const logged = true;
        const profile = true;

        const user = await User.findById(req.session.currentUser._id);
        //res.json
        res.json( user ); 
    } catch (err){
        console.log(err);
        next(createError(404));
    }
});

usersRouter.post("/edit", isLoggedIn, async (req, res, next) =>{
    try{
        const id = req.session.currentUser._id;

        const {
            email,
            password,
            firstName,
            lastName,
            shippingAddress,
        } = req.body;

        //check the await to see if this is ok
        await User.findOneAndUpdate(
            id,
            {
                email,
                password,
                firstName,  // exmp if we add obj inside on model "name.firstName": firstName,
                lastName,
                shippingAddress,
                
            },
            { new: true }
        );

        res.json(user); //<--- check this
    } catch (err) {
        console.log(err);
        next(createError(404));
    }
});

//????
// usersRouter.get("/upload", isLoggedIn, (req, res, next) => {
//   res.json("profile/upload", { logged, profile });
// });



module.exports = usersRouter;
