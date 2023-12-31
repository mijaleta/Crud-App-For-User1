const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const app = express()
const router = require('./routes/route')
const productRouter = require('./routes/productroutes')
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/',(req,res)=>{
    res.render('choice')
})
app.use('/users',router)

app.set('view engine','ejs')
app.use('/products',productRouter)
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log("succefully connected to database")})
.catch((error)=>{console.log(`error while connecting to database with the following error`, error)})
const port = 3000
app.listen(port,()=>{console.log(`app is running on ${port}`)})