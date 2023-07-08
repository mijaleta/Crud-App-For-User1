const express = require('express')
const mongoose = require('mongoose')

// creating schema for our database 
const userSchema =  new mongoose.Schema({
    name:String,
    email:String
    })
    // create model here
    const User = mongoose.model('User',userSchema)

    module.exports = User
    