import express from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createOrderCtrl, getAllOrdersCtrl, getSingleOrderCtrl, updateOrderCtrl } from "../controllers/orderCtrl.js";





const orderRoutes = express.Router();



orderRoutes.post("/",isLoggedIn, createOrderCtrl)
orderRoutes.get("/",isLoggedIn, getAllOrdersCtrl)
orderRoutes.get("/:id",isLoggedIn, getSingleOrderCtrl)
orderRoutes.put("/update/:id",isLoggedIn, updateOrderCtrl)




export default orderRoutes;