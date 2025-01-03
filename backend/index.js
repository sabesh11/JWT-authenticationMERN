const express = require("express")
const app = express()
const cors=require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const bodypraser=require("body-parser")
// const mongoose = require("mongoose");


app.get('/',(req,res)=>{
    res.send("Hey yuh...!!!")
})

app.use(cors())

app.use(bodypraser.json())

const secretKey = 'abcdef';

// const MONGODB_URL ="mongodb://localhost:27017/jwt-auth"

// mongoose.connect(MONGODB_URL)
// .then(()=>{
//     console.log("Connection successful"  + MONGODB_URL);
// })
// .catch((err)=>{
// console.error("error in connecting",err.message);
// })

const users =[]

const jwtToken = (req,res,next)=>{

}

app.get('/signup', async (req,res)=>{
    try{
        const {username,password}=req.body

        const hashPassword = await bcrypt.hash(password,10)
        username.push({username,password:hashPassword})

        res.status(201).send("user created successfully")

    }
    catch(err){
       res.status(500).send("user not created")
    }
    
})

app.listen(3001,()=>{
    console.log("server is running successfully")
})

