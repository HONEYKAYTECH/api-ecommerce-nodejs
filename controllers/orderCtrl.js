import Order from "../model/Order.js";
import asyncHandler from 'express-async-handler';

//@desc create orders
//@route POST /api/v1/s
//@access Private


export const createOrderCtrl = asyncHandler(async(req,res) =>{
   res.json({
    msg: "Order Ctrl",
   }); 
});
