import Order from "../model/Order.js";
import asyncHandler from 'express-async-handler';
import Stripe from "stripe";
import User from "../model/User.js";
import Product from "../model/Product.js";

//@desc create orders
//@route POST /api/v1/s
//@access Private

//Stripe Instance
const stripe =  new Stripe(process.env.STRIPE_KEY);


export const createOrderCtrl = asyncHandler(async(req,res) =>{
    //Get the payload(customer, orderItems, shippingAddress,totalPrice);
    const {orderItems , shippingAddress, totalPrice} = req.body;
    
    
   //Find the user
   const user = await User.findById(req.userAuthId)
   //Check if user has shipping address
   if(!user?.hasShippingAddress){
    throw new Error("Please provide shippingAddress")
   }
   
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
   
   
   //Update the product qty
   const products = await Product.find({_id:{$in:orderItems}});
   orderItems?.map(async(order) =>{
const product = products?.find((product) =>{
    return product?._id?.toString() === order?._id?.toString();
});
 if(product){
    product.totalSold += order.qty;
 }
  await product.save();
   });
   //Push order into user
   user.orders.push(order?._id);
   await user.save();
   
   
   //Make payment (stripe)
   const session = await stripe.checkout.session.create({
    line_items: [
        {
            price_data:{
             currency: "usd" ,
             product_data: {
                name: "BAG",
                description: "Best bag",
             } ,
             unit_amount: 10 * 100, 
            },
            quantity: 2,
        },
    ],
    mode: 'payment',
    success_url:'http://localhost:3000/success',
    cancel_url:'http://localhost:3000/cancel',
   });
   res.send({url: session.url});
   //Payment webhook
   //Update the user order
//    res.json({
//     success:true,
//     message:"Order Created",
//     order,
//     user,
//    })
});
