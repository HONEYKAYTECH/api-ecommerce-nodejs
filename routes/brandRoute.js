import express from 'express';
import {  createBrandCtrl, deleteBrandCtrl, fetchAllBrandsCtrl, getSingleBrandCtrl, updateBrandCtrl } from '../controllers/brandCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';






const brandRoutes = express.Router();



brandRoutes.post("/",isLoggedIn, createBrandCtrl)
brandRoutes.get("/", fetchAllBrandsCtrl)
brandRoutes.get("/:id",getSingleBrandCtrl)
brandRoutes.put("/:id",updateBrandCtrl)
brandRoutes.delete("/:id",deleteBrandCtrl)



export default brandRoutes;