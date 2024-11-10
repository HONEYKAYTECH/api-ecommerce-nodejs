import asyncHandler from 'express-async-handler';
import Coupon from '../model/Coupon.js';

// @desc create new Coupon
//@route POST /api/v1/Coupon
//@acess Private/Admin

export const createCouponCtrl = asyncHandler(async(req, res)=>{
  res.json({
    msg: "Coupon Ctrl"
  });
});
    
