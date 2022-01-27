const mongoose=require('mongoose')


//creating schema for cart
const cartSchema=new mongoose.Schema({
    userId:{type:String,required:true,unique:true},
    products:[
        {
            producID:{ type:String},
            quantity:{type:Number,default:1}
        }
    ],   
},{
    timestamps:true
});

module.exports=mongoose.model("Cart",cartSchema)