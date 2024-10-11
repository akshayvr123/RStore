const express=require('express')
const {addProduct, getCategoryNames, getCategory, editProduct, deleteProduct}=require('../controllers/productControllers')
const { protect } = require('../middlewares/authmiddleware')
const { isAdmin } = require('../middlewares/isAdmin')


const router=express.Router()

router.route('/').post(protect,isAdmin,addProduct)
router.route('/categorynames').get(getCategoryNames)
router.route('/').get(getCategory)
router.route('/edit').put(protect,isAdmin,editProduct)
router.route('/delete').delete(protect,isAdmin,deleteProduct)
//Delete product

module.exports =router