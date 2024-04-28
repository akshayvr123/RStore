
const mongoose=require('mongoose')

const connectDB=async()=>{
    try {
        const conn=await mongoose.connect("mongodb://127.0.0.1:27017/Rstore",{
            // useNewUrlParser:true,
            // useUnifiedTopology:true,
           
        })

        console.log(`MongoDb connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error.message);
        process.exit()
    }
}

module.exports=connectDB