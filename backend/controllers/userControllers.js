const User=require('../Models/userModal')
const asyncHandler=require("express-async-handler")
const generateToken=require("../config/generateToken")

const registerUser=asyncHandler(async(req,res)=>{
    const {key,type,name,email,password,pic}=req.body
    if(!type||!name || !email || !password){
        res.status(400)
        throw new Error("Please enter all fields")
    }
    if(type=="admin"){
        if(key!=="akshay"){
            throw new Error("Incorrect secret key")
        }
    }

    const userExists=await User.findOne({email})
    if(userExists){
        throw new Error("User already exists")
    }
    const user=await User.create({
        type,
        name,
        email,
        password,
        pic
    })
     if(user){
      res.status(201).json({
        _id:user._id,
        type:user.type,
        name:user.name,
        email:user.email,
        pic:user.pic,
        token:generateToken(user._id)
      })
     }else{
        res.status(400)
        throw new Error("Failed to create user")
     }
}) 

const authUser=asyncHandler(async(req,res)=>{
    const {key,type,email,password}=req.body
    if(!type||!email || !password){ 
        res.status(400).send("Send all required fields")

    }

    if(type=="admin"){
        if(key!=="akshay"){
            throw new Error("Incorrect secret key")
        }
    }
    const user=await User.findOne({type,email})
    if(user && (await user.matchPassword(password))){
      res.json({
        _id:user._id,
        name:user.name,
        email:user.email,
        pic:user.pic,
        token:generateToken(user._id)
      })  
    }else{
        res.status(401);
        throw new Error("Invalid Email or Password")
    }
}
) 

module.exports={registerUser,authUser}