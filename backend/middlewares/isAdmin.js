const expressAsyncHandler = require("express-async-handler")



const isAdmin=expressAsyncHandler(async(req,res,next)=>{
    let user=req.user
    if(user.type!=='admin'){
    throw  new Error("This is not admin")
    }else{
        console.log('is admin is true');
        next()
    }
})

module.exports={isAdmin}