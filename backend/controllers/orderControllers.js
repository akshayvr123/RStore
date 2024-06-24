const asyncHandler = require('express-async-handler')
const Razorpay = require('razorpay');
const crypto = require('crypto')
const Order = require('../Models/orderModel')
const Cart = require('../Models/cartModel')

const razorpay = new Razorpay({
    key_id: 'rzp_test_yEeTvW2DPaMXl2',
    key_secret: 'CyupINEm9J4Hw6ICUQ2aOi7F'
});


const createOrder = asyncHandler(async (req, res) => {
    
    const { amount, currency, receipt, notes } = req.body;
    try {
        const order = await razorpay.orders.create({ amount, currency, receipt, notes });
        res.json(order);
    } catch (error) {
        console.log("error at create order" + error);
        res.status(500).send(error);
    }
})

const verifyPayment = asyncHandler(async (req, res) => {
    const id = req.user._id
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cart,name,phone,adress,date } = req.body;
    console.log(name,phone,adress);
    const secret = 'CyupINEm9J4Hw6ICUQ2aOi7F';
    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(razorpay_order_id + '|' + razorpay_payment_id);
    const digest = shasum.digest('hex');

    if (digest === razorpay_signature) {
        // const userExist = await Order.findOne({ userId: id })
        
        // if (!userExist) {

        try {
            const datas = await Order.create({
                userId: id,
                name:name,
                phone:phone,
                adress:adress,
                date:date,
                products: cart
            })
            const data = await Cart.findOneAndDelete({ userId: id })
            res.json({ status: 'success' });
        } catch (error) {
            console.log(error);
        }
        
        // }
        
        // else {
        //     console.log("else block executed");
        //     const data = await Order.findOneAndUpdate({ userId: id }, { $push: { products: [...cart] } })
        // }
     
    } else {
        console.log('failed');
        res.json({ status: 'failure' });
    }
})

const getOrders = asyncHandler(async (req, res) => {
    const id = req.user._id
    try {
        const data = await Order.find({ userId: id })
        if(data){
            res.send(data)
        }else{
            console.log("No orders exist");
        }
    } catch (error) {
        console.log(error);
    }
    
    
})

const getAllOrders=asyncHandler(async(req,res)=>{

    try {
        const data=await Order.find()
        res.status(200).send(data)
        
    } catch (error) {
        res.send(error)
    }
})

const getOrdersAdmin=asyncHandler(async(req,res)=>{
    let id=req.query.id
    console.log(id);
    try {   
        const data=await Order.findOne({_id:id})
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

const editOrder = asyncHandler(async (req, res) => {
    console.log("hello");
    const { id, name } = req.body;

    try {
        const data = await Order.findOneAndUpdate(
            { _id: id, "products.name": name },
            { $set: { "products.$.status": "delivered" } },
            { new: true }
        );

        if (!data) {
            return res.status(404).json({ message: "Order or product not found" });
        }

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});


module.exports = { createOrder, verifyPayment, getOrders ,getAllOrders,getOrdersAdmin,editOrder}