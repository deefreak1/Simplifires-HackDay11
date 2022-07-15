const express = require('express');
const router = express.Router();
const User = require('../models/user');

const Cart = require('../models/cart');
 
const Product = require('../models/product');
const SharedCart = require('../models/sharedcart')

const glob = require('../global.js')




router.post("/register", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    sharedcarts: []
  });

  newUser.save().then(document => {
    res.json({ state: true, msg: "data inserted successully", document: document })
  })
  .catch(err => next(err));
});

router.get("/cartssharedto/:id",(req,res) => {
    var email = req.params['id']
    SharedCart.find({sharedbyemail: email}).then(document=>{
        res.render('../views/cartssharedto.ejs',{"document": document,"uemail": glob.useremail})
    })
})

router.get("/sharedcarts/:id",(req,res)=>{
    var email = req.params['id']
    SharedCart.find({sharedtoemail: email}).then(document=>{
        
        res.render('../views/sharedcart.ejs',{"document": document,"uemail": glob.useremail})
    })
})

router.get("/viewsharedcart/:id",async (req,res) => {
    var user_id = req.params['id']

    const document = await Cart.findOne({useremail: user_id})

    if(document){
         await Product.find({_id:{$in:document.products}}).then((doc) => {
            if(doc){
                res.render('../views/sharedcartview.ejs',{"doc":doc,"uemail": glob.useremail,"id": user_id});
            }else{
                res.json({ status: 500, message: 'Product not found', data: doc});
            }
        })
    }  else{
        res.json({status: 500});
    }  
})

router.post("/login", (req,res) => {
    var uname = req.body.username;
    var pass = req.body.password;
    User.findOne({username: uname,password: pass}).then(document => {
        console.log(document)
        console.log(typeof(document))
        //res.json({ status: 200, message: 'User data fetched Successfully', Userdata: document });
        if(document==null){
            res.render("../views/login.ejs",{
                errorMessage: 'The user doesn\'t exist!'
            })

        }else{
            glob.useremail = document.email
            res.redirect("/product")
        }
    })
})

router.get("/logout",(req,res) => {
    glob.username=""
    res.redirect('/');
})




router.get("/getuser", (req, res) => {
  User.find().then(document => {
    res.json({ status: 200, message: 'User data fetched Successfully', Userdata: document });

  });

});


router.put('/update/:id', (req, res, next) => {
  const newuser = { _id: req.params.id };
  User.updateOne(newuser, {
    name: req.body.name,
    email: req.body.email
  }).then(doc => {
    if (!doc) {
      return res.st(404).end();
    }
    return res.status(200).json(doc);
  })
    .catch(err => next(err));
})



router.delete('/delete/:id', (req, res, next) => {
  User.deleteOne({ _id: req.params.id }).then(document => {
    res.json({ status: 200, message: 'Users data deleted Successfully', document: document });
  })
    .catch(err => next(err));
})



// router.get("/:id", (req, res, next) => {
//   User.findById(req.params.id).then(documents => {
//     if (documents) {
//       res.status(200).json(documents);
//     } else {
//       res.status(404).json({ message: 'data not found' });
//     }
//   });
// });





module.exports = router;