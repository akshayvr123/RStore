const express=require('express')
const { addToCart, removeFromCart } = require('../controllers/cartController')
const { protect } = require('../middlewares/authmiddleware')

const router=express.Router()

router.route('/add').post(protect,addToCart)
router.route('/remove').delete(protect,removeFromCart)

module.exports =router