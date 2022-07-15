const mongoose = require('mongoose');
const schema = mongoose.Schema

const cartSchema = new schema({
  
    useremail: { type: String, required: true },
    products: {type: Array,required:true},
  
});

const Cart = module.exports = mongoose.model('Cart', cartSchema);