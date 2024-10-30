import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createOrderCtrl } from "../controllers/orderCtrl.js";





const orderRoutes = express.Router();



orderRoutes.post("/",isLoggedIn, createOrderCtrl)




export default orderRoutes;