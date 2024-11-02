import Order from "../model/Order.js";
import asyncHandler from 'express-async-handler';
import User from "../model/User.js";
import Product from "../model/Product.js";

//@desc create orders
//@route POST /api/v1/s
//@access Private


export const createOrderCtrl = asyncHandler(async(req,res) =>{
    //Get the payload(customer, orderItems, shippingAddress,totalPrice);
    const {orderItems , shippingAddress, totalPrice} = req.body;
    
    
   //Find the user
   const user = await User.findById(req.userAuthId)
   
   //Check if order is not empty
   if(orderItems?.length <= 0){
    throw new Error("No order items")
   }
   //Place/create order - save into DB
   const order = await Order.create({
    user: user?._id,
    orderItems,
    shippingAddress,
    totalPrice,
   });
   //Push order into user
   user.orders.push(order?._id);
   await user.save();
   
   
   //Update the product qty
   const products = await Product.find({_id:{$in:orderItems}});
   orderItems?.map(async(order) =>{
const product = products?.find((product) =>{
    return product?._id?.toString() === order?._id?.toString();
});
 if(product){
    product.totalSold +=order.qty;
 }
  await product.save();
   });
   
   //Make payment (stripe) 
   //Payment webhook
   //Update the user order
});
