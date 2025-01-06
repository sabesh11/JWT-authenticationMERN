const express=require("express")
const app = express()
const cors = require("cors");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")

app.use(cors())
app.use(express.json())

app.listen(3001,()=>{
    console.log("sever is running on port 3001")
})


const users=[]

const secretKey= 'abcdef'

app.get("/", async(req,res)=>{

    res.status(200).send("Hey Yuh...!!!")
})

const jwtToken = async(req,res,next)=>{

    const token = req.headers.authorization

    if(!token) return res.status(401).send("access denied")

    try{
        const verified=jwt.verify(token,secretKey)
        req.user=verified
        next()
    }
    catch(e){
        req.status(401).send("invalid token")
    }

}

app.post("/signup", async(req,res)=>{
    try{

        const {username,password}=req.body
        const hashedPassword=await bcrypt.hash(password,10)
        console.log(`username: ${username} && password: ${password} `);
        users.push({username:username,password:hashedPassword})
        console.log(users);

        res.status(201).send("user created successfully")
        
         
    }
    catch(e){
        res.status(500).send(e.message)
    }
})


app.post('/login',async(req,res)=>{

    try{
        const {username,password} = res.body

        const user = users.find(user=>user.username===username)

        if(!user) return res.status("401").send("user not found")

        const validPassword = jwt.compare(password,user.password)

        if(!validPassword) return res.status("401").send("invalid password")

        const token = jwt.sign({username:username.username},secretKey)

        res.status(200).send(token)
        
    }
    catch(e){
        res.status(401).send(e.message)
    }
})

app.get("/profile",jwtToken,async(req,res)=>{
    res.status(200).send("hey shit ! focus on your career bro...!")
})