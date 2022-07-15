const mongoose = require('mongoose');
const schema = mongoose.Schema

const sharedCartSchema = new schema({
  
    sharedbyemail: { type: String, required: true },
    sharedtoemail: {type:String,required:true},
  
});

const SharedCart = module.exports = mongoose.model('SharedCart', sharedCartSchema);