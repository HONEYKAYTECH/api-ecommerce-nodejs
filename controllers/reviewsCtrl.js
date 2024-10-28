// import Review from "../model/Review";
import asyncHandler from 'express-async-handler';
import Review from '../model/Review.js';
import Product from '../model/Product.js';



// @desc Create new Review
// @route POST api/v1/Reviews
// @access Private/Admin

export const createReviewCtrl = asyncHandler(async(req, res) => {
    const { product, message, rating } = req.body;
    // 1. Find the Product 
    const { productID } = req.params;
    const productFound = await Product.findById(productID).populate("reviews");
    if(!productFound){
        throw new Error ("Product not found")
    }
    // check if user already reviewed this product.
    const hasReviewed = productFound?.reviews?.find((review) =>{ 
        return review?.user?.toString() === req?.userAuthId?.toString();
    });
    if(hasReviewed){
       throw new Error ("You have already reviewed this product") ;
    }
    // console.log(hasReviewed)
    //Create review
    const review = await Review.create({
      message,
      rating,
      product: productFound?._id,
      user: req.userAuthId,
    });
    //Push the review into the product Found
    productFound.reviews.push(review?._id)
    // resave 
    await productFound.save() 
    res.status(201).json({
        success: true,
        message: "Review Created Successfully",
    });
});