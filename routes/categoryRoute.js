import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createCategoryCtrl } from '../controllers/categoryCtrl.js';
// import { createCategoryCtrl } from '../controllers/categoryCtrl.js';


const categoryRoutes = express.Router();


categoryRoutes.post('/', isLoggedIn,createCategoryCtrl)






export default categoryRoutes;
