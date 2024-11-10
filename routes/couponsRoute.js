import express from 'express';
import { createCouponCtrl } from '../controllers/couponCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';




const couponRoutes = express.Router();


couponRoutes.post("/",isLoggedIn,createCouponCtrl)



export default couponRoutes;