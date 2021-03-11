require('dotenv').config();
const express = require('express');
const paymentsRouter = express.Router();
const { isLoggedIn } = require('./../helpers/middleware');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('./../models/user.model');

// POST /api/payments/checkout-session
paymentsRouter.post('/checkout-session', isLoggedIn, async (req, res) => {   
    const userId = req.session.currentUser._id; 
    const user = await User.findById(userId).populate('cart.product');
    console.log('user', user);
    // get the cart info of the user and update the line_items
    const itemsToCharge = user.cart.map((item)=>{
        const itemObj = {
            price_data: {
                currency: 'eur',
                product_data: {
                  name: item.product.name,
                  images: [ item.product.img ],
                },
                unit_amount: (item.product.price) * 100,
              },
              quantity: item.qty,
        }

        return itemObj;
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: itemsToCharge,
      mode: 'payment',
      success_url: `${process.env.PUBLIC_DOMAIN}/payment/success`,
      cancel_url: `${process.env.PUBLIC_DOMAIN}/payment/canceled`,
    });

    // empty the user cart 
    res.json({ id: session.id });
  });

module.exports = paymentsRouter;