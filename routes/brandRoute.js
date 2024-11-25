import express from 'express';
import {  createBrandCtrl, deleteBrandCtrl, fetchAllBrandsCtrl, getSingleBrandCtrl, updateBrandCtrl } from '../controllers/brandCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import isAdmin from '../middlewares/isAdmin.js';







const brandRoutes = express.Router();



brandRoutes.post("/",isLoggedIn,isAdmin, createBrandCtrl)
brandRoutes.get("/", fetchAllBrandsCtrl)
brandRoutes.get("/:id",getSingleBrandCtrl)
brandRoutes.put("/:id",isLoggedIn,isAdmin,updateBrandCtrl)
brandRoutes.delete("/:id",isLoggedIn,isAdmin,deleteBrandCtrl)



export default brandRoutes;