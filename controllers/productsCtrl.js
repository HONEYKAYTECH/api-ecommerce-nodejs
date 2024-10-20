import asyncHandler from 'express-async-handler';
import Product from '../model/Product.js';





// @desc Create new product
// @route POST /api/v1/products
// @access Private/Admin
export const createProductCtrl = asyncHandler(async (req, res) =>{
    const { name, description, category, sizes, colors, user, price, totalQty, brand } = req.body;
    // check if product exist
    const productExists = await Product.findOne({ name });
    if (productExists) { 
        throw new Error("Product Already Exists");
    }
    // create the product
    const product = await Product.create({
        name, description, 
        category, sizes, 
        colors, 
        user: req.userAuthId,
        price, totalQty, brand
    });
    //push the product in to the category
    //send response
    res.json({
        status: "success",
        message: "Product created successfully",
        product,
    });
});



// @desc Get all product
// @route GET /api/v1/products
// @access Public

export const getProductsCtrl = asyncHandler(async(req,res) =>{
    console.log(req.query)
    //Query
    let productQuery = Product.find();
    
    
    //Search by name
    if(req.query.name) {
        productQuery = productQuery.find({
            name: { $regex: req.query.name, $options: "i"},
        });
    }
    //Sesrch by brand
    if(req.query.brand) {
        productQuery = productQuery.find({
            brand: { $regex: req.query.brand, $options: "i"},
        });
    }
    //filter by colors
    if(req.query.colors) {
        productQuery = productQuery.find({
            colors: { $regex: req.query.colors, $options: "i"},
        });
    }
    //filter by category
    if(req.query.category) {
        productQuery = productQuery.find({
            category: { $regex: req.query.category, $options: "i"},
        });
    }
    //filter by size
    if(req.query.sizes) {
        productQuery = productQuery.find({
            sizes: { $regex: req.query.sizes, $options: "i"},
        });
    }
    //filter by price range
    if (req.query.price ){
        const priceRange = req.query.price.split("-");
        //gte: greater or equal to
        //lte: less than or equal to
        productQuery = productQuery.find({
            price: { $gte: priceRange[0], $lte: priceRange[1]},
        });
    }
    //PAGINATION
    //Page
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    //Limit
    const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
    //Start Index
    const startIndex = (page - 1) * limit;
    //End Index
    const endIndex = page * limit;
    //Total
    const total = await Product.countDocuments()
    //
    productQuery = productQuery.skip(startIndex).limit(limit);

    //Pagination Results
    const pagination = {};
    if (endIndex < total ) {
        pagination.next = {
            page: page + 1,
            limit,
        };
    }
    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit,
        };
    }
    //Await the query
    const products = await productQuery;
    
   
    res.json({
        status: "Success",
        total,
        results: products.length,
        message: "Products Fetched Successfully",
        products,
    });
});


// @desc Get Single product
// @route GET /api/products/:id
// @access Public

export const singleProductCtrl = asyncHandler(async(req, res) =>{
    const singleProduct = await Product.findById(req.params.id);
     if (!singleProduct) {
        throw new Error("SingleProduct Not Found")
     }
     res.json({
        status: "Success",
        message: "SingleProduct Fetched Successfully",
        singleProduct,
     })
});