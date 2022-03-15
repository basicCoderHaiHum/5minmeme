const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://Asad:shaguftanaz@cluster0.6jrm8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser : true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, "error"));
db.once('open', ()=>{
    console.log("Connected!");
});
const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
const signupStruc = new mongoose.Schema({
    name : String,
    email : String,
    password : String
});
const signup = mongoose.model("signUp", signupStruc);
const fs = require("fs");
const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log("Server Started!");
});
app.get("/:id", (req, res) => {
    var item = req.path;
    item = item.replace("/:", "");
    var index1 = item.indexOf("+");
    const name = item.substring(0, index1);
    item = item.slice(index1+1);
    index1 = item.indexOf("+");
    const gmail = item.substring(0, index1);
    item = item.slice(index1+1);
    index1 = item.indexOf("+");
    const password = item.substring(0, index1);
    var myArr = {
        "name" : name,
        "email" : gmail,
        "password" : password
    };
    const data = new signup(myArr);
    signup.find({email : gmail}, (err, user) => {
        if(err) {
            res.send("error");
        }
        else if(user.length > 0) {
            res.send("exist");
        }
        else {
            data.save().then(() => {
                res.send("yes");
            });
        }
    })
});
app.get("/log/:id", (req, res) => {
    var item = req.path;
    item = item.replace("/log/:", "");
    var index1 = item.indexOf("+");
    const email = item.substring(0, index1);
    item = item.slice(index1+1);
    index1 = item.indexOf("+");
    var password = item.substring(0, index1);
    item = item.slice(index1+1);
    index1 = item.indexOf("+");
    password = item;
    signup.find({email : email, password : password}, (err, user) => {
        if(user.length > 0) {
            res.send(user);
        }
        else {
            res.send({"Status" : "No"});
        }
    })
});
app.get("/bye", (req, res) => {
    res.end("ok");
});
