import express from "express";
import { createProductCtrl, getProductsCtrl, singleProductCtrl } from "../controllers/productsCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";


const productRoutes = express.Router();


productRoutes.post("/",isLoggedIn,createProductCtrl )
productRoutes.get("/",getProductsCtrl )
productRoutes.get("/:id",singleProductCtrl)



export default productRoutes;