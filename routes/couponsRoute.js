import express from 'express';
import { createCouponCtrl, deleteCouponCtrl, getAllCoupons, getSingleCouponCtrl, updateCouponCtrl } from '../controllers/couponCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';




const couponRoutes = express.Router();


couponRoutes.post("/",isLoggedIn,createCouponCtrl)
couponRoutes.get("/",getAllCoupons)
couponRoutes.get("/:id",getSingleCouponCtrl)
couponRoutes.put("/update/:id",updateCouponCtrl)
couponRoutes.delete("/delete/:id",deleteCouponCtrl)



export default couponRoutes;