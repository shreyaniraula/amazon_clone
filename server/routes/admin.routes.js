const express = require("express");
const adminRouter = express.Router();
const admin = require("../middleware/admin.middleware.js");
const Product = require("../models/product.model.js");

adminRouter.post('/admin/add-product', admin, async(req, res)=>{
    try{
        const {name, description, quantity, images, category, price} = req.body;
        let product = new Product({
            name, description, quantity, images, category, price
        });
        product = await product.save();
        res.json(product);
    }
    catch(e){
        return res.status(500).json({error: e.message});
    }
})

adminRouter.get('/admin/get-products', admin, async(req, res)=>{
    try{
        const products = await Product.find({});
        res.json(products);
    }
    catch(e){
        return res.status(500).json({error: e.message});
    }
});

adminRouter.post('/admin/delete-products', admin, async(req, res)=>{
    try {
        const {productId} = req.body;
    
        const product = await Product.findByIdAndDelete(productId);
        res.send(product);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});
module.exports = adminRouter