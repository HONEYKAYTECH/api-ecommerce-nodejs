import Category from "../model/Category.js";
import asyncHandler from 'express-async-handler';
// @des Create new category
// @route POST api/v1/categories
// @access Private/Admin


export const createCategoryCtrl = asyncHandler(async(req, res) =>{
    const {name} = req.body;

    //Check if category exists
    const categoryFound = await Category.findOne({name})
    if(categoryFound) {
        throw new Error('Category already exists')
    }
    //Create 
    const category = await Category.create({
        name,
        user: req.userAuthId,
    });

    res.json({
        status: "success",
        mrssage: "Category Created Successfully",
        category,
    });
});