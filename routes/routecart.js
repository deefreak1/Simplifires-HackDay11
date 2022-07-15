const express = require('express');
const Cart = require('../models/cart');
const router = express.Router();
const Product = require('../models/product');
const User = require('../models/user');
const SharedCart = require('../models/sharedcart')
const glob = require('../global.js')


router.get("/:id", async (req,res) => {
    var user_id = req.params['id']

    const document = await Cart.findOne({useremail: user_id})

    if(document){
         await Product.find({_id:{$in:document.products}}).then((doc) => {
            if(doc){
                res.render('../views/cart.ejs',{"doc":doc, "uemail": glob.useremail});
            }else{
                res.json({ status: 500, message: 'Product not found', data: doc});
            }
        })
    }  else{
        res.json({status: 500});
    }  

})



router.post("/addProduct",(req,res) => {
    var uemail = req.body.useremail;
    var pid = req.body.productid;
    const newCart = new Cart({
        useremail: uemail,
        products : [pid]
    });
    Cart.findOne({useremail: uemail}).then(document => {
        if(document == null){
            newCart.save().then(document => {
                res.redirect('/product')
              })
              
        }
        else{
            Cart.updateOne({useremail: uemail},
            {$push:{"products":pid}}).then(doc => {
                if (!doc) {
                    res.json({ status: 400, message: 'not added', data: doc});
                }else{
                    res.redirect('/product')
                }
              })
                .catch(err => next(err));
            }        
    }).catch(err => next(err));

})

router.post("/shareCart",(req,res) => {
    var sharedbyemail = req.body.sharedbyemail;
    var sharedtoemail = req.body.sharedtoemail;
    const newSharedCart = new SharedCart({
        sharedbyemail: sharedbyemail,
        sharedtoemail: sharedtoemail
    });
    

        newSharedCart.save().then(document => {
            //console.log("fjghb" + glob.useremail)
            res.redirect('/cart/' + glob.useremail)
        })      
    })

router.post("/deletesharedcart/:by/:to",(req,res) => {
    var sharedbyemail = req.params['by'];
    var sharedtoemail = req.params['to'];
    // console.log("fdhb"+sharedbyemail)
    // res.json({ status: 500, message: 'Error'});

    SharedCart.deleteOne({"sharedbyemail": sharedbyemail,"sharedtoemail": sharedtoemail}).then(document=>{
        if(document){
            res.redirect('/user/cartssharedto/' + glob.useremail)
        }else{
            res.json({ status: 500, message: 'Error', data: document});
        }
    })
}) 






module.exports = router;