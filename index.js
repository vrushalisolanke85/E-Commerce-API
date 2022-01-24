const express=require('express')
const app=express()
const mongoose=require('mongoose')

//security key
const dotenv=require('dotenv')
dotenv.config()

//Database connection
mongoose
.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("DBConnection established!!!")
})
.catch((err)=>{
    console.log(err)
})







//listening the server port
app.listen(5000,()=>{
    console.log("Backend server is running!!!")
})

