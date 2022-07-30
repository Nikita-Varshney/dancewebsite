const express = require('express');
// const fs = require('fs');
const path = require("path")
const app = express();
const bodyparser = require("body-parser")

var mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser:true});
//connecting mongo to mongod
// var db = mongoose.connection;
// db.on('error',console.error.bind(console,'connection error:'));
// db.once('open',()=>{
//     //we'r connected
//     console.log("we are connected successfully!!! hurray!!!!")
// });

const port = 80; 

//define mongoose Schema
var contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
//define Model
var Contact = mongoose.model('contact',contactSchema);

//express spec
app.use('/static',express.static('static'))// For static file means anyone can use it
app.use(express.urlencoded())  //for fetching data from user

//PUG SPECIFIC CONFIG.
app.set('view engine','pug')// Set the templete engine pug
app.set('views',path.join(__dirname,'views'))


//request endpoint
app.get('/',(req,res)=>{
    const param = {}
    res.status(200).render('home.pug',param)
})
app.get('/contact',(req,res)=>{
    const param = {}
    res.status(200).render('contact.pug',param)
})
//if we wanna do post request with express we have to install body parser
app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This data is saved in data base")
    }).catch(()=>{
        res.status(404).send("data is not saved to the database!")
    })

})


//START THE SERVER
app.listen(port,()=>{
    console.log(`the application started successfully on port ${port}`)
})