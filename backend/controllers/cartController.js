const asyncHandler = require('express-async-handler')
const Cart = require('../Models/cartModel')

const addToCart = asyncHandler(async (req, res) => {
    const id = req.user._id
    const { products } = req.body
    const { category, name, price, quantity, image } = products
    const cartExist = await Cart.findOne({ userId: id })
    if (cartExist) {
        console.log(cartExist);
        //Checking whether the product is already in the array
        const productExist=cartExist.products.find((elem)=>elem.name===name)
        if(productExist){
            res.send("Product already exist")
        }else{
        cartExist.products.push({
            category: category,
            name: name,
            price: price,
            quantity: quantity,
            image: image
        })
        await cartExist.save()
        res.send(cartExist)}
    } else {
        const data = await Cart.create({
            userId: id,
            products: [{
                category: category,
                name: name,
                price: price,
                quantity: quantity,
                image: image
            }]

        })
        res.send(data)
    }
})

module.exports = { addToCart }