const mongoose=require('mongoose')

const cartSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model for user identification
        required: true,
      },
   products:[{
     category:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        
    }}]
})

module.exports = mongoose.model('Cart', cartSchema);