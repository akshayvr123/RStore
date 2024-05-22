const express=require('express')
const {addProduct, getCategoryNames, getCategory, editProduct, deleteProduct}=require('../controllers/productControllers')
const { protect } = require('../middlewares/authmiddleware')


const router=express.Router()

router.route('/').post(addProduct)
router.route('/categorynames').get(getCategoryNames)
router.route('/').get(getCategory)
router.route('/edit').put(protect,editProduct)
router.route('/delete').delete(deleteProduct)
//Delete product




module.exports =router