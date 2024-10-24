import express from 'express';
// import { isLoggedIn } from '../middlewares/isLoggedIn';
import { createColorCtrl, deleteColorCtrl, fetchAllColorsCtrl, getSingleColorCtrl, updateColorCtrl } from '../controllers/colorsCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';


const colorRoutes = express.Router();



colorRoutes.post("/",isLoggedIn,createColorCtrl)
colorRoutes.get("/", fetchAllColorsCtrl)
colorRoutes.get("/:id",getSingleColorCtrl)
colorRoutes.put("/:id",updateColorCtrl)
colorRoutes.delete("/:id",deleteColorCtrl)


export default colorRoutes;