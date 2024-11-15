import asyncHandler from 'express-async-handler';
import Coupon from '../model/Coupon.js';


// @desc create new Coupon
//@route POST /api/v1/Coupon
//@acess Private/Admin

export const createCouponCtrl = asyncHandler(async(req, res)=>{
    const {code, startDate, endDate,discount} = req.body;
    //Check if Admin
    //Check if coupon already exists
    const couponExists = await Coupon.findOne({
        code,
    });
    if (couponExists){
        throw new Error("Coupon already exists");
    }
    //Check if discount is a number
    if (isNaN(discount)){
        throw new Error("Discount value must be a number");
    }
    //Create coupon
    const coupon = await Coupon.create({
        code,
        startDate,
        endDate,
        discount,
        user: req.userAuthId,
    });
    //send the response
    res.status(201).json({
        status: "success",
        message: "Coupon created successfully",
        coupon,
    });
});


// @desc Get all Coupon
//@route GET /api/v1/Coupons
//@acess Private/Admin

export const getAllCoupons = asyncHandler(async(req, res) =>{
    const coupons = await Coupon.find();
    res.status(200).json({
        status: "success",
        message: "All coupons",
        coupons,
    });
});

// @desc Get single Coupon
//@route GET /api/v1/Coupons/:id
//@acess Private/Admin

export const getSingleCouponCtrl = asyncHandler(async(req,res)=>{
    const coupon = await Coupon.findById(req.params.id);
    res.json({
        status: "success",
        message: " Single coupon fetched successfully",
        coupon,
    });
});


// @desc UPdate Coupon
//@route PUT /api/v1/Coupons
//@acess Private/Admin

export const updateCouponCtrl = asyncHandler(async(req,res)=>{
    const {code, startDate, endDate,discount} = req.body;
     const coupon = await Coupon.findByIdAndUpdate(req.params.id, {
        code: code?.toUpperCase(),
        discount,
        startDate,
        endDate,
    },
    {
      new: true,
    }
);
res.json({
    status: "success",
    message: "Coupon updated successfully",
    coupon,
})
});


// @desc Delete Coupon
//@route DELETE /api/v1/Coupons
//@acess Private/Admin

export const deleteCouponCtrl = asyncHandler(async(req,res)=>{
    const {code, startDate, endDate,discount} = req.body;
     const coupon = await Coupon.findByIdAndDelete(req.params.id);
res.json({
    status: "success",
    message: "Coupon deleted successfully",
    coupon,
})

});
    
