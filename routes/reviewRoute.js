import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createReviewCtrl } from '../controllers/reviewsCtrl.js';



const reviewRoutes = express.Router();


reviewRoutes.post("/:id",isLoggedIn,createReviewCtrl )





export default reviewRoutes;