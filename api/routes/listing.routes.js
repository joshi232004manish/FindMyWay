import express from "express"
import { updateBus,updateFlight,updateHoliday,updateTrain,updateHotel, getFlight,getBus,getHoliday,getTrain,getHotel, getBus1 } from "../controllers/listing.controller.js";
// import { updateFlight } from "../controllers/listing.controller.js";
const router = express.Router();


// router.post('/signup',signUp);
// router.post('/signin',signin);
router.param('/',(req,res,next)=>{
    console.log("midlleware working");
    next();
})

router.post('/flight',updateFlight);
router.post('/train',updateTrain);
router.post('/bus',updateBus);
router.post('/hotel',updateHotel);
router.post('/holiday',updateHoliday);
router.get('/flight',getFlight);
router.get('/train',getTrain);
router.get('/bus',getBus);
router.get('/bus1',getBus1)
router.get('/hotel',getHotel);
router.get('/holiday',getHoliday);

export default router;


