import express from "express";
// import { signUp } from "../controllers/auth.controller.js";
import { verify,login,register,google, access_user,updateUser, getUser } from "../controllers/auth.controller.js";


const router = express.Router();


// router.post('/signup',signUp);
// router.post('/signin',signin);
router.param('/',(req,res,next)=>{
    console.log("midlleware working");
    next();
})
router.post('/register',register);
router.post('/verify',verify);
router.post('/login',login);
router.post('/google',google);
router.post('/access_user',access_user);
router.post('/updateUser',updateUser);
router.get('/getUser/:id',getUser);


export default router