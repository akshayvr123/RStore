const express=require('express');
const app=express();
const userRoutes=require('./routers/userRoutes')
const productRoute=require('./routers/productRoute')
const cartRoutes=require('./routers/cartRoutes')
const orderRoute=require('./routers/orderRoutes')
const connectDB=require('./config/db')
const dotenv=require('dotenv')
const cors=require('cors')
const bodyParser = require('body-parser');


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
app.use('/api/cart',cartRoutes) 
app.use('/api/order',orderRoute)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});