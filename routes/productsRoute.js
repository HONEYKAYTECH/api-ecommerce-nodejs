import express from "express";
import { createProductCtrl, deleteProductCtrl, getProductsCtrl, singleProductCtrl, updateProductCtrl } from "../controllers/productsCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";


const productRoutes = express.Router();


productRoutes.post("/",isLoggedIn,createProductCtrl )
productRoutes.get("/",getProductsCtrl )
productRoutes.get("/:id",singleProductCtrl)
productRoutes.put("/:id",isLoggedIn,updateProductCtrl)
productRoutes.delete("/:id/delete",isLoggedIn,deleteProductCtrl)



export default productRoutes;