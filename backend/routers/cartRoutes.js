const express=require('express')
const { addToCart } = require('../controllers/cartController')
const { protect } = require('../middlewares/authmiddleware')

const router=express.Router()

router.route('/add').post(protect,addToCart)
// router.route('/remmove').delete(addToCart)

module.exports =router