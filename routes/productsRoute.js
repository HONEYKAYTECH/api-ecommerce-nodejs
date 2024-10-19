import express from "express";
import { createProductCtrl } from "../controllers/productsCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";


const productRoutes = express.Router();


productRoutes.post("/",isLoggedIn,createProductCtrl )



export default productRoutes;