import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

import {createAccessToken} from "../utils/jwt.js"
const HASH = 10;

import jwt from 'jsonwebtoken';
const SECRET="secret123";

export const allUsers = async (req, res)=>{
    const users = await User.find();
    res.status(201).json(users);
};

export const register = async (req, res)=>{
    const {username, email, password}=req.body;
    try{
        const userFound = await User.findOne({email});
        if (userFound) 
            return res.status(400).json({message: "The email is ready in use"});
        const passwordHash = await bcrypt.hash(password, HASH);
        const newUser = new User({
            username,
            email,
            password:passwordHash,
        });
    const savedUser = await newUser.save();
    const token = await createAccessToken({id: savedUser._id});
    res.cookie('token', token);
    res.json({
        id:savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt,
    });
    }
    catch (error){
        res.status(500).json({message: error.message});
    }
}

export const login = async (req, res)=>{
    const {password, email}=req.body;
    try{
        const userFound = await User.findOne({email})

        if(!userFound)
            return res.status(404).json({message:"User not Found.."});
        const isMatch = await bcrypt.compare(password, userFound.password);
        if(!isMatch)
            return res.status(409).json({message:"Password Incorrect.."});
    const token = await createAccessToken({id: userFound._id});
    res.cookie('token', token, 
    // {sameSite:'none', secure:true,httpOnly:false}
    );
    res.json({
        id:userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    });
    }
    catch (error){
        res.status(500).json({message: error.message});
    }
}

export const logout = (req, res)=>{
    res.cookie('token',"",{ espires: new Date(0)});
    return res.status(200).json({message:'Logout..'});
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);
    if(!userFound)
        return res.status(404).json({message:"User not Found"});
    return res.json({
            id:userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });    
}

export const change = async (req, res)=>{
    const {username, email, password}=req.body;

    try{
        let userFound = await User.findOne({email});
        if(!userFound)
            return res.status(404).json({message:"User not Found.."});
        const passwordHash = await bcrypt.hash(password, HASH);
        if (username){
            userFound = {
                ...userFound,
                _id: userFound._id, 
                username: username,
                email: userFound.email,
                password: userFound.password,
                createdAt: userFound.createdAt,
                updatedAt: userFound.updatedAt
            }
        }
        console.log(userFound);
         userFound = {
            _id: userFound._id,
            username: userFound.username,
            email:userFound.email,
            password: passwordHash,
            createdAt: userFound.createdAt,
            updatedAt: new Date
        }

        const userUpdate = await User.findByIdAndUpdate(userFound._id, userFound,{new:true});

        const token = await createAccessToken({id: userFound._id});
        res.cookie('token', token);
        res.json({
            id:userUpdate._id,
            username: userUpdate.username,
            email: userUpdate.email,
            createdAt:userUpdate.createdAt,
            updatedAt: userUpdate.updatedAt,
        });
    }
    catch (error){
        res.status(500).json({message: error.message});
    }
}

export const verifyToken = async (req, res)=>{
    const {token} = req.cookies;
    if(!token) return res.status(401).json({message:'Unauthorized'});

    jwt.verify(token, SECRET, async (err, user) =>{
        if(err) return res.status(401).json({message: 'Token unauthorized'});
        const userAuth = await User.findById(user.id);
        if(!userAuth) return res.status(401).json({message: 'Is Not authorized'})


        return res.json({
            id:userAuth._id,
            username:userAuth.username,
            email: userAuth.email
        });
    });
};
