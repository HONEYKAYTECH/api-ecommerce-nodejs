import User from "../model/User.js";
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';



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
           msg: "You Hxve Successfully Login" ,
           userFound,
        });
    } else {
        throw new Error("Invalid login credentials");
    }
});
