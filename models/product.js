const mongoose = require('mongoose');
const schema = mongoose.Schema

const productSchema = new schema({
  
    productname: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: {type:String,required:true},
  
});

const Product = module.exports = mongoose.model('Product', productSchema);