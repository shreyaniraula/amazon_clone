const express = require("express");
const auth = require("../middleware/auth.middleware");
const Product = require("../models/product.model.js")
const productRouter = express.Router();

productRouter.get('/api/products', auth, async(req, res)=>{
    try{
        const products = await Product.find({category: req.query.category});
    }
    catch(e){
        res.status(500).json({error: e.message});
    }
});

module.exports = productRouter;