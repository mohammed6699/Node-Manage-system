import dotenv from 'dotenv'
dotenv.config()
import User from '../models/user.model.js';
import {SUCCESS, ERROR, FAIL} from '../utlits/http-status.js';
import { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";

// get all users
const getAllUsers = async (req, res) => {
  // pagination
  const query = req.query;
  const page = query.page;
  const limit = query.limit;
  const end = (page - 1) * limit;
  const user = await User.find().populate("tasks").limit(limit).skip(end);
  if(!user){
    res.status(401).json({status: FAIL, data:{message: "This User is not exists"}});
  };
  res.status(201).json({status: SUCCESS, data: {user}});
};
// get userbyid
const getUserById = async(req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password").populate("tasks")
    if(!user){
      res.status(404).json({status: FAIL, data: {message: "User is not found"}})
    }
    res.status(202).json({status: SUCCESS, data: {user}})
  } catch (err) {
    res.status(500).json({status: ERROR, data: {message: err}})
  }
};
// register new user
const registerUser = async(req, res) => {
  const {UserName, FirstName, LastName, email, password } = req.body
  const user = await User.findOne({UserName})
  // check if the user exists or not 
  if(user){
    res.status(401).json({status:FAIL, data: {message: "Authentication Error"}});
  }
  const newUser = new User({
    UserName,
    FirstName,
    LastName,
    email,
    password
  });
  await User.create(newUser);
  res.status(201).json({status: SUCCESS, data:{newUser}});
};
// login user (Authentication)
const loginUser = async(req, res) => {
  const {UserName, password} = req.body;
  const user = await User.findOne({UserName});
  if(!user){
    res.status(401).json({status: FAIL, data:{message: "Authentication Errors"}});
  }
  const enteredPass = compareSync(ppassword, user.password);
  if(!enteredPass){
    res.status(401).json({status: FAIL, data:{message: "Authentication Errors"}});
  }
  // generate jwt
  const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_TOKEN, {expiresIn: '1day'});
  user.token = token
  res.status(201).json({status: SUCCESS, data: { token }});
}
//update user
const updateUser = async (req, res) => {
  if(req.decodeToken._id !== req.params._id){
    return res.status(401).json({status:ERROR, data:{message: "Not allowed update"}});
  };
  try {
    const userId = req.params.id
    const updatedUser = await User.findByIdAndUpdate(userId, {$set: {...req.body}, new: true}).select('-password');
    if(!updatedUser){
      return res.status(404).json({status: ERROR, data:{message: "User Not Found"}});
    }
    res.status(201).json({status: SUCCESS, data:{updateUser}});
  } catch (error) {
    res.status(500).json({status: ERROR, data: {message: error}});
  }
}
// delete user
const deleteUser = async(req, res) =>{
  if(req.decodeToken._id !== req.params._id){
    return res.status(401).json({status:ERROR, data:{message: "Not allowed update"}});
  }
  try {
    const userId = req.params.id
    const deletedUser = await User.findByIdAndDelete(userId)
    if(!deletedUser){
      return res.status(404).json({status: ERROR, data:{message: "User Not Found"}});
    }
    res.status(201).json({status: SUCCESS, data: {message: "User deleted successfully"}})
  } catch (err) {
    res.status(500).json({status: ERROR, data:{message: err}});
  }
}
export{
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser
}