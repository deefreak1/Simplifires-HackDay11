const express = require('express');
const router = express.Router();
const Product = require('../models/product');

const glob = require('../global.js')

router.get("/",(req,res) => {
    Product.find().then((document) => {
        console.log(glob.useremail)
        res.render('../views/home.ejs',{"document": document, "uemail": glob.useremail})
    })
})

router.post("/",(req,res) => {
    const newProduct = new Product({
        productname: req.body.productname,
        price: req.body.price,
        category: req.body.category,
        description: req.body.description,
      });
    
      newProduct.save().then(document => {
        res.json({ state: true, msg: "data inserted successully", document: document })
      })
      .catch(err => next(err));
})

module.exports = router;