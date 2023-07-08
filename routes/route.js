const express =  require('express')
const app= express()
const router = express.Router()
const User = require('../models/user')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());

// getting all users
router.get('/',async(req,res)=>{
        try{
            const users = await User.find()
            res.render('users',{users:users})
        }
        catch(error){
            console.log(`error while taking data from database in also the error ia the following ${error}`);
        }
        })
// creating users
router.get('/create',(req,res)=>{
    res.render('create')
    })

    // creating user
    router.post('/create',async(req,res)=>{
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
    router.get('/edit/:id',async(req,res)=>{
        try{
            const id= req.params.id
            const user = await User.findById(id)
            res.render('edit',{user:user})
       }
        catch(error){
            console.log(`there is an error while getting user from database with the folowing error `+error)
            console.log(error);
        }
    
    })
    // editing user here
    router.post('/edit/:id',async(req,res)=>{
    try{
        const {id} = req.params
        const name = req.body.name
        const email = req.body.email
        await User.findByIdAndUpdate(id,{name, email})
        res.redirect('/users')
    }
    catch(error){
        console.log(`There is an error while editing the user with the following error `);
        console.log(error);
    }
    })
    // deleting user from database
    router.post('/delete/:id',async(req,res)=>{
        try{
            const id = req.params.id        
            await User.findByIdAndRemove(id)
            const users = User.find()
            res.redirect('/users')
            // res.render('users',{users:users})
        }
        catch(error){
            console.log("there is an error while deleting fromdatabase with the following error");
        }
    })

module.exports = router