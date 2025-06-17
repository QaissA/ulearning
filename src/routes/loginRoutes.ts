import {
    registerUser,
    loginUser
  } from "../controller/authController";
  
import express from "express";
  
const loginRouter = express.Router();

//ROUTES FOR LOGIN CONTROLLER
loginRouter.post("/", registerUser);
loginRouter.post("/signin", loginUser);

export default loginRouter;
