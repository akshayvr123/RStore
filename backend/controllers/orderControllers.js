const asyncHandler = require('express-async-handler')
const Razorpay = require('razorpay');
const crypto=require('crypto')
const Order=require('../Models/orderModel')
const Cart=require('../Models/cartModel')

const razorpay = new Razorpay({
    key_id: 'rzp_test_yEeTvW2DPaMXl2',
    key_secret: 'CyupINEm9J4Hw6ICUQ2aOi7F'
});


const createOrder=asyncHandler( async (req, res) => {
    console.log("create order");
    const { amount, currency, receipt, notes } = req.body;
    try {
        const order = await razorpay.orders.create({ amount, currency, receipt, notes });
        res.json(order);
    } catch (error) {
        console.log("error at create order"+error);
        res.status(500).send(error);
    }
})

const verifyPayment=asyncHandler( async(req, res) => {
    const id = req.user._id
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature,cart } = req.body;
  
    const secret = 'CyupINEm9J4Hw6ICUQ2aOi7F';
    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(razorpay_order_id + '|' + razorpay_payment_id);
    const digest = shasum.digest('hex');

    if (digest === razorpay_signature) {
        const userExist=await Order.findOne({userId:id})
        console.log("userExist is"+userExist);
        if(!userExist){
            const data=await Order.create({
                userId:id,
                products:cart
            })
        }else{
           console.log("else block executed");
           const data=await Order.findOneAndUpdate({userId:id},{$push:{products:[...cart]}})
        }
        const data=await Cart.findOneAndDelete({userId:id})
        res.json({ status: 'success' });
    } else {
        console.log('failed');
        res.json({ status: 'failure' });
    }
})



module.exports={createOrder,verifyPayment}