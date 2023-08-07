const express= require('express')
const bodyparser = require('body-parser')
const app = express()
const productRoutes = express.Router()
const Product = require('../models/product')
// all product
productRoutes.get('/',async(req,res)=>{
const products = await Product.find()
res.render('products',{products:products})
})
// product form 
productRoutes.get('/createProduct',(req,res)=>{
res.render('createProduct')
})
// saving single product
productRoutes.post('/createProduct',(req,res)=>{
    const {name,price} = req.body
const newProduct = new Product({
name:name,
price:price
})
newProduct.save()
res.redirect('/products')
console.log("saved");
})
// deleting product 
productRoutes.post('/delete/:id',async(req,res)=>{
try{
    const id = req.params.id
await Product.findByIdAndRemove(id)
res.redirect('/products')
}
catch(error){
    console.log(error);
}

})

// edting product  form
productRoutes.get('/editProduct/:id',async(req,res)=>{

try{
    const id = req.params.id
    const product  = await Product.findById(id)
    res.render('editProduct',{product:product})
}
catch(error){
    console.log(error);
}
// applying method here
productRoutes.post('/editProduct/:id',async(req,res)=>{
const {id}= req.params
const {name,price} = req.body
await Product.findByIdAndUpdate(id,{name, price})
res.redirect('/products')
})






})



module.exports = productRoutes