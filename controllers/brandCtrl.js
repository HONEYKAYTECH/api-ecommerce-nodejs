import Brand from "../model/Brand.js";
import asyncHandler from 'express-async-handler';


// @des Create Brand
// @route POST api/v1/Brands
// @access Private/Admin


export const createBrandCtrl = asyncHandler(async(req, res) =>{
    const {name} = req.body;

    //Check if Brand exists
    const brandFound = await Brand.findOne({name})
    if(brandFound) {
        throw new Error('Brand already exists')
    }
    //Create 
    const brand = await Brand.create({
        name: name.toLowerCase(),
        user: req.userAuthId,
    });
    res.json({
        status: "success",
        mrssage: "Brand Created Successfully",
        brand,
    });
});

// @des Fetch all brands
// @route GET api/v1/brands
// @access Public

export const fetchAllBrandsCtrl = asyncHandler(async(req, res) =>{
    const brands = await Brand.find()
    res.json({
        status: "success",
        mrssage: "Brands Fetched Successfully",
        brands,
    });
});


// @des Get single brand
// @route GET api/v1/:id/brand
// @access Public

export const getSingleBrandCtrl = asyncHandler(async(req, res) =>{
    const brand = await Brand.findById(req.params.id)
    res.json({
        status: "success",
        mrssage: "Brand Fetched Successfully",
        brand,
    });
});

// @des Update brand
// @route PUT api/v1/:id/brand
// @access Private/Admin

export const updateBrandCtrl = asyncHandler(async(req, res) =>{
    const { name } = req.body;
    
    //UPDATE
    const brand = await Brand.findByIdAndUpdate(req.params.id, {
        name,   
    },
    {
       new: true,
    }
);
res.json({
    status: "Success",
    message: "Brand Updated Successfully",
    brand,
 })
});


// @des Delete brand
// @route DELETE api/v1/:id/brand
// @access Private/Admin

export const deleteBrandCtrl = asyncHandler(async(req, res) =>{ 
    await Brand.findByIdAndDelete(req.params.id);
res.json({
   status: "Success",
   message: "Brand Deleted Successfully",
})
});