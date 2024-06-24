const express=require('express')
const { createOrder, verifyPayment, getOrders, getAllOrders,getOrdersAdmin,editOrder } = require('../controllers/orderControllers')
const { protect } = require('../middlewares/authmiddleware')
const router=express.Router()

router.route('/').get(protect,getOrders)
router.route('/admin').get(protect,getOrdersAdmin)
router.route('/edit').put(protect,editOrder)
router.route('/all').get(getAllOrders)
router.route('/create-order').post(createOrder)
router.route('/verify-payment').post(protect,verifyPayment)

module.exports=router