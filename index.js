const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const app = express()
app.use(bodyparser.urlencoded({ extended: true }));
app.set('view engine','ejs')
mongoose.connect('mongodb://127.0.0.1:27017/crud-app-for-user1')
.then(()=>{
    console.log("succefully connected to database");
})
.catch((error)=>{console.log(`error while connecting to database with the following error ${error}`);})
// app.get('/',(req,res)=>{res.render('index.ejs')})
// creating schema for our database 
const userSchema =  new mongoose.Schema({
name:String,
email:String
})
// create model here
const User = mongoose.model('User',userSchema)
app.get('/create',(req,res)=>{
res.render('create')
})
// Welcome page
app.get('/',(req,res)=>{
res.send("welcome")
})
// getting all users
app.get('/users',async(req,res)=>{
    try{
        const users = await User.find()
        res.render('users',{users:users})
    }
    catch(error){
        console.log(`error while taking data from database in also the error ia the following ${error}`);
    }
    })
// creating user
app.post('/create',async(req,res)=>{
   const {name,email} = req.body
    try{ 
        const newUser = new User({
        name:name,
        email:email
        })
        await newUser.save()
        const users = await User.find()
        res.redirect('/users')
    }
catch(error){
console.log(error)
    }
})
// for getting editing post form 
app.get('/edit/:id',async(req,res)=>{
    try{
        const id= req.params.id
        const user = await User.findById(id)
        res.render('edit',{user:user})
    }
    catch(error){
        console.log(`there is an error while getting user from database with the folowing error ${error}`)
    }


})
// editing user here
app.post('/edit/:id',async(req,res)=>{
try{
    const {id} = req.params
    const {name,email} = req.body
    await User.findByIdAndUpdate(id,{name, email})
    res.redirect('/users')
}
catch(errr){
    console.log(`There is an error while editing the user with the following error ${error}`);
}
})
// deleting user from database
app.post('/delete/:id',async(req,res)=>{
    try{
        const id = req.params.id        
        await User.findByIdAndRemove(id)
        const users = User.find()
        res.redirect('/users')
        // res.render('users',{users:users})
    }
    catch(error){
        console.log("there is an error while deleting fromdatabase with the following error"+ error);
    }

})

const port = 3000
app.listen(port,()=>{console.log(`app is running on ${port}`)})