const asyncHandler = require('express-async-handler');
const Product = require('../Models/productModel');

const addProduct = asyncHandler(async (req, res) => {
    const { name, description, imageUrl, products } = req.body;
    const { name: name1, description: description1, price: price1, stock: stock1, image: image1 } = products;

    if (!name || !description || !products) {
        res.status(400);
        throw new Error("Send all relevant fields");
    }

    // const query = { products: { $elemMatch: { name: name1 } } };
    // const productExists = await Product.findOne(query);

    // if (productExists) {

    //     throw new Error("Product already exists");
    // }

    let categoryExist = await Product.findOne({ name });

    if (categoryExist) {
        const productExistsInCategory = categoryExist.products.some(product => product.name === name1);

        if (productExistsInCategory) {
            throw new Error("Product already exists in this category");
        } else {
            categoryExist.products.push({
                name: name1,
                description: description1,
                price: price1,
                stock: stock1,
                image: image1
            });
            await categoryExist.save(); // Save changes to the category
            res.status(201).json({
                category: categoryExist
            });
        }
    } else {
        // If category doesn't exist, create a new one
        const newCategory = new Product({
            name,
            description,
            imageUrl,
            products: [{
                name: name1,
                description: description1,
                price: price1,
                stock: stock1,
                image: image1
            }]
        });
        await newCategory.save();
        res.status(201).json({
            newCategory
        });
    }
});

const getCategoryNames=asyncHandler(async(req,res)=>{
    try {
        let category=await Product.find()
        let categoryNames=category.map((cat)=>{
            return cat.name
        })
        res.status(201).json({
            categoryNames
        })
    } catch (error) {
        console.log("an error occured while fectching");
    }
   
})

const getCategory=asyncHandler(async(req,res)=>{
    const {categoryname}=req.query
    console.log(categoryname);
    if(!categoryname){
        console.log("please send a category name");
    }
    try {
        let category=await Product.findOne({name:categoryname})
        res.status(200).json({
            category
        })
        
    } catch (error) {
        console.log("No category exist");
    }
})

const editProduct = asyncHandler(async(req, res) => {
    const { categoryname, products } = req.body;
    const {id,name, description, price, stock, image}=products
    if(!categoryname||!products||!name){
        console.log("Sent all relevant fields");
    }
    try {
        // Find the category
        let category = await Product.findOne({ name: categoryname });
        if (category) {
            // Find the product within the category
            let product = category.products.find(prod => prod._id == id);
            if (product) {
                // Update the product fields
                product.name = name;
                product.description = description;
                product.price = price;
                product.stock = stock;
                product.images = image;
                await category.save(); // Save the updated category
                res.send(product).status(200)
               
            } else {
                console.log("No such product exists in this category");
                res.status(404).json({ success: false, message: "No such product exists in this category" });
            }
        } else {
            console.log("No such category exists");
            res.status(404).json({ success: false, message: "No such category exists" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});


module.exports = { addProduct,getCategoryNames,getCategory,editProduct };
