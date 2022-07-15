const express = require ('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
//const config = require ('./config/database');
const routeuser = require('./routes/routeuser');
const routeproduct = require('./routes/routeproduct');
const routecart = require('./routes/routecart');
const bodyParser = require('body-parser');

const Data = ["",""]



const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://deefreak:hackday@cluster0.vf7s5yz.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        console.log('MongoDB connected!!');
    } catch (err) {
        console.log('Failed to connect to MongoDB', err);
    }
};

connectDB();


//request read as json
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use("/user",routeuser);
app.use("/product",routeproduct);
app.use("/cart",routecart);




app.get("/",function(req,res){
	res.render("../views/login.ejs")
})

app.listen(port,function(){
    console.log("server is " + port);

});