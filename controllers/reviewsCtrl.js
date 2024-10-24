// import Review from "../model/Review";
import asyncHandler from 'express-async-handler';
import Review from '../model/Review.js';



// @desc Create new Review
// @route POST api/v1/Reviews
// @access Private/Admin

export const createReviewCtrl = asyncHandler(async(req, res) => {
    res.json({
        message: "Review Ctrl"
    });
});