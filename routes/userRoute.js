import express from 'express';
import { getUserProfileCtrl, loginUserCtrl, registerUserCtrl } from '../controllers/usersCtrl';




const userRoutes = express.Router();

userRoutes.post('/api/v1/users/register', registerUserCtrl)
userRoutes.post('/api/v1/users/login', loginUserCtrl)
userRoutes.get('/api/v1/users/profile', getUserProfileCtrl)







export default userRoutes;