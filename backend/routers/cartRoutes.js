const express=require('express')
const { addToCart, removeFromCart ,getCartItems,updateCartCount} = require('../controllers/cartController')
const { protect } = require('../middlewares/authmiddleware')

const router=express.Router()

router.route('/add').post(protect,addToCart)
router.route('/remove').delete(protect,removeFromCart)
router.route('/').get(protect,getCartItems)
router.route('/update').put(protect,updateCartCount)

module.exports =router