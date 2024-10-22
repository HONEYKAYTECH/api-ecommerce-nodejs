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

// @des Fetch all categories
// @route GET api/v1/categories
// @access Public

export const fetchAllCategoriesCtrl = asyncHandler(async(req, res) =>{
    const categories = await Category.find()
    res.json({
        status: "success",
        mrssage: "Categories Fetched Successfully",
        categories,
    });
});


// @des Get single category
// @route GET api/v1/:id/category
// @access Public

export const getSingleCategoriesCtrl = asyncHandler(async(req, res) =>{
    const category = await Category.findById(req.params.id)
    res.json({
        status: "success",
        mrssage: "Category Fetched Successfully",
        category,
    });
});

// @des Update category
// @route PUT api/v1/:id/category
// @access Private/Admin

export const updateCategoryCtrl = asyncHandler(async(req, res) =>{
    const { name } = req.body;
    
    //UPDATE
    const category = await Category.findByIdAndUpdate(req.params.id, {
        name,   
    },
    {
       new: true,
    }
);
res.json({
    status: "Success",
    message: "Category Updated Successfully",
    category,
 })
});


// @des Delete category
// @route DELETE api/v1/:id/category
// @access Private/Admin

export const deleteCategoryCtrl = asyncHandler(async(req, res) =>{ 
    await Category.findByIdAndDelete(req.params.id);
res.json({
   status: "Success",
   message: "Category Deleted Successfully",
})
});

