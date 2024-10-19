import express from "express";
import dotenv from "dotenv";
dotenv.config();
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/userRoute.js";
import { globalErrhandler } from "../middlewares/globalErrHandler.js";
import productsRoutes from "../routes/productsRoute.js";





//db connect
dbConnect()
const app = express();

//pass incoming data
app.use(express.json());


//routes
app.use('/api/v1/users/',userRoutes);
app.use('/api/v1/products/',productsRoutes);

//err handler
// app.use(notFound);
app.use(globalErrhandler);


//MaleeqBryan
export default app;