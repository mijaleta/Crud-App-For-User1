const mongoose = require('mongoose')
//   product schema 
const productSchema = new mongoose.Schema({
name:String,
price:Number
})
// product model
const Product = mongoose.model('Product',productSchema)
// export Product
module.exports = Product
