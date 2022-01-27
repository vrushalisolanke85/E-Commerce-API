const router=require('express').Router();
const cryptoJs = require('crypto-js');
const User = require('../models/user');
const {verifyToken,verifyTokenAndAdmin,verifyTokenAndAuthorization}=require('./verifyToken')


//update
router.put('/:id',verifyTokenAndAuthorization,async(req,res)=>{
    if(req.body.password){
        req.body.password=cryptoJs.AES.encrypt(
            req.body.password,process.env.PASS_ENC
        ).toString()
    }
    try{
        const updatedUser=await User.findByIdAndUpdate(req.params.id,{
            $set:req.body //set everything in the body into user database
        },{new:true})
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(500).json(err)
    }
})

//delete
router.delete('/:id',verifyTokenAndAuthorization,async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user has been deleted!!!")
    }catch(err){
        res.status(500).json(err)
    }
})

//get only admin can see any users
router.get('/find/:id',verifyTokenAndAdmin,async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        //res.status(200).json(user)
        const {password,...others}=user._doc
        res.status(200).json({others})
    }catch(err){
        res.status(500).json(err)
    }
})

//get only admin can get all users
router.get('/',verifyTokenAndAdmin,async(req,res)=>{
    const query=req.query.new
    try{
        const user=query? await User.find().sort({_id:-1}).limit(1):await User.find()
        
        res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
})


//Get user stats
router.get('/stats',verifyTokenAndAdmin,async(req,res)=>{
    const date=new Date()
    const lastYear=new Date(date.setFullYear(date.getFullYear()-1))
    try{
    const data=await User.aggregate([
        {$match:{createdAt:{$gte:lastYear}}},
        {
            $project:{
                month:{$month:'$createdAt'},
            },     
            
        },
        {
            $group:{
                _id:"$month",
                total:{$sum:1}
            }
        }
    ])
    res.status(200).json(data)
    }catch(err){
        res.status(500).json(err)
    }
})
module.exports=router