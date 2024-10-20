import express from "express";
import { createProductCtrl, getProductsCtrl } from "../controllers/productsCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";


const productRoutes = express.Router();


productRoutes.post("/",isLoggedIn,createProductCtrl )
productRoutes.get("/",getProductsCtrl )



export default productRoutes;