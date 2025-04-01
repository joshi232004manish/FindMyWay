import express from 'express';
import { test,test1 } from "../controllers/user.controller.js";

const router = express.Router();

router.param('id1',(req,res,next,val)=>{
    console.log('Middleware called');
    next();
})

router.get('/test',test);

export default router


