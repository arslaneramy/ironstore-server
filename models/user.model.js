const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true },
  firstName: {type: String, required: true },
  lastName: {type: String, required: true},
  shippingAddress: {type: String, required: true},
  cart: [{
    product: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
    qty: { type: Number, min: 1, required: true }
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
}
);


const User = mongoose.model('User', userSchema);

module.exports = User;