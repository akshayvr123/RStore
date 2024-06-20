const express=require('express')
const { createOrder, verifyPayment } = require('../controllers/orderControllers')
const { protect } = require('../middlewares/authmiddleware')
const router=express.Router()

// router.route('/').get(getOrders)
// router.route('/all').get(getAllOrders)
router.route('/create-order').post(createOrder)
router.route('/verify-payment').post(protect,verifyPayment)

module.exports=router