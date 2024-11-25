import express from "express";
import { createProductCtrl, deleteProductCtrl, getProductsCtrl, singleProductCtrl, updateProductCtrl } from "../controllers/productsCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import upload from "../config/fileUpload.js";
import isAdmin from "../middlewares/isAdmin.js";


const productRoutes = express.Router();


productRoutes.post("/",isLoggedIn,isAdmin,upload.array("files"),createProductCtrl )
productRoutes.get("/",getProductsCtrl )
productRoutes.get("/:id",singleProductCtrl)
productRoutes.put("/:id",isAdmin,isLoggedIn,updateProductCtrl)
productRoutes.delete("/:id/delete",isLoggedIn,isAdmin,deleteProductCtrl)



export default productRoutes;