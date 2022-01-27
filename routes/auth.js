const router=require('express').Router();
const User=require('../models/user')
const cryptojs=require('crypto-js')
const jwt=require("jsonwebtoken")

router.post('/register',async(req,res)=>{
    const newUser=new User({
        username:req.body.username,
        email:req.body.email,
        password:cryptojs.AES.encrypt(req.body.password,process.env.PASS_ENC)
    })
    try{
        const savedUser=await newUser.save()
        res.status(201).json(savedUser)
    }catch(err){
        res.status(500).json(err)
    }
})

router.post('/login',async(req,res)=>{
    try{
        const user=await User.findOne({username:req.body.username})
        !user && res.status(401).json("Wrong credentials!!")
        const hashedPassword=cryptojs.AES.decrypt(
            user.password,
            process.env.PASS_ENC
        )
        const originalpassword=hashedPassword.toString(cryptojs.enc.Utf8)

        originalpassword!=req.body.password&&res.status(401).json("Wrong credentials!!")

        const accessToken=jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin
        },process.env.JWT_SEC,{expiresIn:'3d'})

        //destructuring information from user
        const{password,...others}=user._doc //to show only required things 
        res.status(200).json({...others,accessToken})
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports=router