import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";


const generateToken = (id) =>{
 return jwt.sign({id},process.env.JWT_KEY, {expiresIn: '7d'});
};




export default generateToken;