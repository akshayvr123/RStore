const express=require('express')
const { createOrder, verifyPayment, getOrders, getAllOrders,getOrdersAdmin,editOrder } = require('../controllers/orderControllers')
const { protect } = require('../middlewares/authmiddleware')
const { isAdmin } = require('../middlewares/isAdmin')
const router=express.Router()

router.route('/').get(protect,getOrders)
router.route('/admin').get(protect,isAdmin,getOrdersAdmin)
router.route('/edit').put(protect,isAdmin,editOrder)
router.route('/all').get(protect,isAdmin,getAllOrders)
router.route('/create-order').post(createOrder)
router.route('/verify-payment').post(protect,verifyPayment)

module.exports=router