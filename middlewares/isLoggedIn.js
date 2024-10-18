import { getTokenFromHeader } from "../utils/getTokenFromHeader.js"
import { verifyToken } from "../utils/verifyToken.js"

export const isLoggedIn = (req, res, next)=>{
 //get token from the header
 const token = getTokenFromHeader(req)
 //verify the token
 const decodedUser = verifyToken(token)
 if(!decodedUser){
    throw new Error("invalid/expired token, please login again");
 }else{
    //save the user in to the req obj
    req.userAuthId = decodedUser?.id;
    next();
 }
 
}