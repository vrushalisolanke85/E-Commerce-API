const mongoose=require('mongoose');



//creating schema for Order
const OrderSchema=new mongoose.Schema({
    userId:{type:String,required:true,unique:true},
    products:[
        {
            producID:{ type:String},
            quantity:{type:Number,default:1}
        }
    ], 
    amount:{
        type:Number,required:true
    },
    address:{
        type:Object,required:true
    },
    status:{
        type:String,
        default:'Pending'
    }
},{
    timestamps:true
});

module.exports=mongoose.model("Order",OrderSchema)