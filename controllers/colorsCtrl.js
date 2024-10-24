import Color from "../model/Color.js";
import asyncHandler from 'express-async-handler';


// @des Create Color
// @route POST api/v1/Colors
// @access Private/Admin


export const createColorCtrl = asyncHandler(async(req, res) =>{
    const {name} = req.body;

    //Check if Color exists
    const colorFound = await Color.findOne({name})
    if(colorFound) {
        throw new Error('Color already exists')
    }
    //Create 
    const color = await Color.create({
        name: name.toLowerCase(),
        user: req.userAuthId,
    });
    res.json({
        status: "success",
        mrssage: "Color Created Successfully",
        color,
    });
});

// @des Fetch all Colors
// @route GET api/v1/Colors
// @access Public

export const fetchAllColorsCtrl = asyncHandler(async(req, res) =>{
    const colors = await Color.find()
    res.json({
        status: "success",
        mrssage: "Colors Fetched Successfully",
        colors,
    });
});


// @des Get single Color
// @route GET api/v1/:id/Color
// @access Public

export const getSingleColorCtrl = asyncHandler(async(req, res) =>{
    const color = await Color.findById(req.params.id)
    res.json({
        status: "success",
        mrssage: "Color Fetched Successfully",
        color,
    });
});

// @des Update Color
// @route PUT api/v1/:id/Color
// @access Private/Admin

export const updateColorCtrl = asyncHandler(async(req, res) =>{
    const { name } = req.body;
    
    //UPDATE
    const color = await Color.findByIdAndUpdate(req.params.id, {
        name,   
    },
    {
       new: true,
    }
);
res.json({
    status: "Success",
    message: "Color Updated Successfully",
    color,
 })
});


// @des Delete Color
// @route DELETE api/v1/:id/Color
// @access Private/Admin

export const deleteColorCtrl = asyncHandler(async(req, res) =>{ 
    await Color.findByIdAndDelete(req.params.id);
res.json({
   status: "Success",
   message: "Color Deleted Successfully",
})
});