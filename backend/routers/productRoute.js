const express=require('express')
const {addProduct, getCategoryNames, getCategory, editProduct}=require('../controllers/productControllers')


const router=express.Router()

router.route('/').post(addProduct)
router.route('/categorynames').get(getCategoryNames)
router.route('/').get(getCategory)
router.route('/edit').put(editProduct)




module.exports =router