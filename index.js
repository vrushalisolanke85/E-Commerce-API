const express=require('express')
const app=express()
const mongoose=require('mongoose')
const userRoute=require('./routes/user.routes')
const authRoute=require('./routes/auth')
const productRoute=require('./routes/product.routes')
const cartRoute=require('./routes/cart.routes')
const orderRoute=require('./routes/order.routes')

//security key
const dotenv=require('dotenv')
dotenv.config()

//accepting json file
app.use(express.json())

//Database connection
mongoose
.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("DBConnection established!!!")
})
.catch((err)=>{
    console.log(err)
})

app.use('/api/users',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/products',productRoute)
app.use('/api/carts',cartRoute)
app.use('/api/orders',orderRoute)



//listening the server port
app.listen(process.env.PORT||5000,()=>{
    console.log("Backend server is running!!!")
})

