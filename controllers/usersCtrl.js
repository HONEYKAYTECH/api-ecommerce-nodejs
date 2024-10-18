import User from "../model/User.js";
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";
// import generateToken from "../utils/generateToken.js";


export const registerUserCtrl = asyncHandler( async (req,res) =>{
    const { fullname, email, password } = req.body;
    
    //check  user exist
    const userExists = await User.findOne({ email });
    if(userExists) {
        //throw 
     throw new Error( "User already exist");
        
    }
    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //Create the user
    const user = await User.create({
        fullname,
        email,
        password: hashedPassword,
    })
    res.status(201).json({
        status:'success',
        mrssage: `User ${user.email} Registered Sucessfully`,
        data: user,
    })
    });

//@desc Login user
//@route POST api/v1/users/Login
//@acess Public
export const loginUserCtrl = asyncHandler(async (req, res) =>{
    const {email, password} = req.body;

    //find the user in the DB by email only
    const userFound = await User.findOne({
        email,
    });
    if(userFound && await bcrypt.compare(password, userFound?.password)) {
        res.json({
           status: "Success",
           msg: "You Have Successfully Login" ,
           userFound,
           token:generateToken(userFound?._id),
        });
    } else {
        throw new Error("Invalid login credentials");
    }
  });

//@desc GET user profile
//@route GET api/v1/users/profile
//@acess Private
export const getUserProfileCtrl = asyncHandler(async (req, res) =>{
   const token = getTokenFromHeader(req)
   //verifyToken
   const verified = verifyToken(token)
   console.log(req)
  res.json({
    msg: "welcome to profile page",
  });
});