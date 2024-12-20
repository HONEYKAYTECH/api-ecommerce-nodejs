import Order from "../model/Order.js";
import asyncHandler from 'express-async-handler';
import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import User from "../model/User.js";
import Product from "../model/Product.js";
import Coupon from "../model/Coupon.js";



//@desc create orders
//@route POST /api/v1/s
//@access Private

//Stripe Instance
const stripe =  new Stripe(process.env.STRIPE_KEY);


export const createOrderCtrl = asyncHandler(async(req,res)=>{
   //Get the coupon
   const { coupon } = req?.query;
   const couponFound = await Coupon.findOne({
      code: coupon?.toUpperCase(),
   });
   if(couponFound?.isExpired){
      throw new Error("Coupon has expired")
   }
   if(!couponFound){
      throw new Error("Coupon does not exists")
   }

   //Get discount
   const discount = couponFound?.discount / 100;
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
    totalPrice: couponFound ? totalPrice - totalPrice * discount : totalPrice,
   });
   console.log(order);
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
   //Convert order items to have same structure that stripe need
   const convertedOrders = orderItems.map((item)=>{
      return {
        price_data:{
            currency: "usd",
            product_data: {
              name: item?.name,
              description: item?.description  
            },
            unit_amount: item?.price * 100
        },
        quantity: item?.qty,
      };
   });
   const session = await stripe.checkout.sessions.create({
    line_items: convertedOrders,
    metadata: {
      orderId: JSON.stringify(order?._id),
    },
    mode: "payment",
    success_url:'http://localhost:3000/success',
    cancel_url:'http://localhost:3000/cancel',
   });
   res.send({url: session.url });
   });

   //@desc get all orders
//@route GET /api/v1/orders
//@access Private

export const getAllOrdersCtrl = asyncHandler(async(req, res) =>{
   //Find all orders
   const orders = await Order.find();
   res.json({
      success: true,
      message: "All orders",
      orders,
   })
});

//@desc get single order
//@route GET /api/v1/orders/:id
//@access Private/Admin

export const getSingleOrderCtrl = asyncHandler(async(req, res)=>{
   //get the id from params
   const id = req.params.id;
   const order = await Order.findById(req.params.id);
   //send response
   res.status(200).json({
      success: true,
      message: "Single order",
      order,
   });
});



//@desc Update order to delivered
//@route PUT /api/v1/orders/update/:id
//@access Private/Admin

export const updateOrderCtrl = asyncHandler(async(req, res) =>{
  //get the id from params
  const id = req.params.id;
  //Update
  const updatedOrder = await Order.findByIdAndUpdate(id,{
   status: req.body.status,
  },
  {
    new: true,
  }
);
//send response
res.status(200).json({
   success: true,
   message: "Update order",
   updatedOrder,
});
});

//@desc get sales sum of orders 
//@route GET /api/v1/orders/sales/sum
//@access Private/Admin

export const getSalesSumCtrl = asyncHandler(async(req,res)=>{
 //get the sales
 const sales = await Order.aggregate([
   {
     $group:{
      _id:null,
      totalSales:{
         $sum: "$totalPrice"
      },
     },
   },
 ]);
//send response
res.status(200).json({
   success: true,
   message: "Sum of orders",
   sales,
});
});

//@desc get sales sum of orders 
//@route GET /api/v1/orders/sales/sum
//@access Private/Admin

export const getOrderStatsCtrl = asyncHandler(async(req, res)=>{
 //get order stats
 const orders = await Order.aggregate([
   {
      "$group":{
         _id:null,
         minimumSale:{
            $min: "$totalPrice",
         },
         totalSales:{
            $sum:"$totalPrice",
         },
         maxSale:{
            $max: "$totalPrice",
         },
         avgSale:{
            $avg: "$totalPrice",
         },
      },
   },
 ]);
//get the date
const date = new Date();
const today = new date(date.getFullYear(), date.getMonth(), date.getDate()); 
const saleToday = await Order.aggregate([
   {
      $match:{
         createdAt:{
          $gte: today,  
         },
      },
   },
   {
      $group:{
         _id:null,
         totalSales: {
           $sum: "$totalPrice", 
         },
      },
   },
]);
//send response
res.status(200).json({
   success: true,
   message: "Sum of orders",
  orders,
  saleToday,
});
});

