import express from 'express';
import { createCouponCtrl, getAllCoupons } from '../controllers/couponCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';




const couponRoutes = express.Router();


couponRoutes.post("/",isLoggedIn,createCouponCtrl)
couponRoutes.get("/",getAllCoupons)



export default couponRoutes;