import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import gtasc from "../utils/generateTokenAndSetCookie.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const signUpUser = asyncHandler(async(req,res)=>{
    const {name,username,email,password} = req.body
    if(
        [name,username,email,password].some((field)=>field?.trim()==="") 
    ){
        throw new ApiError(400, "All fields are required")
    }
    const existedUser = await User.findOne({
        $or : [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    const salt= await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const user = new User({
        name,
        username,
        email,
        password: hashedPassword
    })

    await user.save()
    if(user){
        const token = gtasc(user._id, res);
        const response = new ApiResponse(201, {
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            token: token, // Include token in the response
        }, "User registered successfully");
        res.status(response.statusCode).json(response);
    }
    else{
        throw new ApiError(500, "Something went wrong while registering the user")
    }
})

const loginUser=asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    if(
        [email,password].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400, "All fields are required")
    }
    const user = await User.findOne({email})
    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    // Compare the password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid email or password");
    }

    // Generate JWT token and set it in a cookie
    const token = gtasc(user._id, res);

    // Respond with ApiResponse
    const response = new ApiResponse(200, {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        token: token,
    }, "Logged in successfully");

    res.status(response.statusCode).json(response);
});

// User logout
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0), // Expire the cookie immediately
        sameSite: "strict",
    });

    // Respond with ApiResponse
    const response = new ApiResponse(200, null, "Logged out successfully");
    res.status(response.statusCode).json(response);
});



export {signUpUser, loginUser, logoutUser}

