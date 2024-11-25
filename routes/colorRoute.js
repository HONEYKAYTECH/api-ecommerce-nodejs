import express from 'express';
// import { isLoggedIn } from '../middlewares/isLoggedIn';
import { createColorCtrl, deleteColorCtrl, fetchAllColorsCtrl, getSingleColorCtrl, updateColorCtrl } from '../controllers/colorsCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import isAdmin from '../middlewares/isAdmin.js';



const colorRoutes = express.Router();



colorRoutes.post("/",isLoggedIn,isAdmin,createColorCtrl)
colorRoutes.get("/", fetchAllColorsCtrl)
colorRoutes.get("/:id",getSingleColorCtrl)
colorRoutes.put("/:id",isLoggedIn,isAdmin,updateColorCtrl)
colorRoutes.delete("/:id", isLoggedIn, isAdmin,deleteColorCtrl)


export default colorRoutes;