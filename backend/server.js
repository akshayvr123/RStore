const express=require('express');
const app=express();
const userRoutes=require('./routers/userRoutes')
const productRoute=require('./routers/productRoute')
const connectDB=require('./config/db')
const dotenv=require('dotenv')
const cors=require('cors')



dotenv.config()
const port=5000;
connectDB()
app.use(cors())
app.use(express.json()) 

app.get('/',(req,res)=>{
    res.send("Hello ")
})
app.use('/api/product',productRoute)
app.use('/api/user',userRoutes) 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});