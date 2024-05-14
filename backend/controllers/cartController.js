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

const removeFromCart = asyncHandler(async (req, res) => {
    const userId = req.user._id; // Assuming req.user._id is the user's ID
    console.log(userId);
    const { name } = req.body;

    // Find the cart belonging to the user
    const cartExist = await Cart.findOne({ userId: userId });

    if (cartExist) {
        // Find the product in the cart's products array
        const productIndex = cartExist.products.findIndex(item => item.name === name);

        if (productIndex !== -1) {
            // If product exists in the cart, remove it from the array
            cartExist.products.splice(productIndex, 1);
            
            // Save the updated cart
            await cartExist.save();
            
            // Send the updated cart as response
            res.send(cartExist);
        } else {
            res.status(404).send("Product not found in the cart");
        }
    } else {
        res.status(404).send("Cart not found");
    }
});


module.exports = { addToCart,removeFromCart }