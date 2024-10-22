import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createCategoryCtrl, deleteCategoryCtrl, fetchAllCategoriesCtrl, getSingleCategoriesCtrl, updateCategoryCtrl } from '../controllers/categoryCtrl.js';
// import { createCategoryCtrl } from '../controllers/categoryCtrl.js';


const categoryRoutes = express.Router();


categoryRoutes.post("/", isLoggedIn,createCategoryCtrl)
categoryRoutes.get("/", fetchAllCategoriesCtrl)
categoryRoutes.get("/:id",getSingleCategoriesCtrl)
categoryRoutes.put("/:id", isLoggedIn,updateCategoryCtrl)
categoryRoutes.delete("/:id", isLoggedIn,deleteCategoryCtrl)






export default categoryRoutes;
