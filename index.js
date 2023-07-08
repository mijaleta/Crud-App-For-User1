const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const app = express()
const router = require('./routes/route')
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/users',router)
app.set('view engine','ejs')
mongoose.connect('mongodb://127.0.0.1:27017/crud-app-for-user1')
.then(()=>{
    console.log("succefully connected to database");
})
.catch((error)=>{console.log(`error while connecting to database with the following error ${error}`);})

// Welcome page
app.get('/',(req,res)=>{
    res.send("welcome")
    })


const port = 3000
app.listen(port,()=>{console.log(`app is running on ${port}`)})