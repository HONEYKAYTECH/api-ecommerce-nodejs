import express from 'express';
import { createCouponCtrl, deleteCouponCtrl, getAllCoupons, getSingleCouponCtrl, updateCouponCtrl } from '../controllers/couponCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import isAdmin from '../middlewares/isAdmin.js';





const couponRoutes = express.Router();


couponRoutes.post("/",isLoggedIn,isAdmin,createCouponCtrl)
couponRoutes.get("/",getAllCoupons)
couponRoutes.get("/:id",getSingleCouponCtrl)
couponRoutes.put("/update/:id",isLoggedIn, isAdmin,updateCouponCtrl)
couponRoutes.delete("/delete/:id", isLoggedIn,isAdmin,deleteCouponCtrl)



export default couponRoutes;