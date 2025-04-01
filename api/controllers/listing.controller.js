import Flight from "../models/flight.model.js";
import Train from "../models/train.model.js";
import Bus from "../models/bus.model.js";
import Hotel from "../models/hotel.model.js";
import Holiday from "../models/holiday.model.js";
import fs from "fs";


export const updateFlight = async(req,res,next)=>{
    try {
        const data = req.body;
       const flight = await Flight.insertMany(data);
        res.status(200).json(flight);
    } catch (error) {
        next(error);
    }
    
}
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const bus_data = fs.readFileSync(`${__dirname}/../sample.json`, "utf-8");
// console.log(bus_data);
console.log(__dirname);
export const updateTrain = async(req,res,next)=>{
    try {
        const data = req.body;
       const train = await Train.insertMany(data);
        res.status(200).json(train);
    } catch (error) {
        next(error);
    }

}

export const updateBus = async(req,res)=>{
    try {
        const data = req.body;
        const bus = await Bus.insertMany(bus_data);
        // console.log('success')
        res.status(200).json(bus);
    } catch (error) {
        console.log(error.message);
    }

}
updateBus(); 
console.log(process.argv);

export const updateHotel = async(req,res,next)=>{
    try {
        const data = req.body;
       const hotel = await Hotel.insertMany(data);
        res.status(200).json(hotel);
    } catch (error) {
        next(error);
    }

}

export const updateHoliday = async(req,res,next)=>{
    try {
        const data = req.body;
        const holiday = await Holiday.insertMany(data);
        res.status(200).json(holiday);
    } catch (error) {
        next(error);
    }
 
}

export const getFlight = async(req,res,next)=>{
    try {

        const {departureAirport,arrivalAirport,departureDate} = req.query;
        const startOfDay = new Date(departureDate);
        startOfDay.setUTCHours(0,0,0,0); // Start of the day (00:00:00)
        // console.log("api called");
        const endOfDay = new Date(departureDate);
        endOfDay.setUTCHours(23, 59, 59, 999); // End of the day (23:59:59)

        
        const flight = await Flight.find({
            departureAirport,
            arrivalAirport,
            departureTime: { $gte: startOfDay, $lt: endOfDay },
        });
        if(flight===null)  res.status(300).json("flight not found");
        res.status(200).json(flight);

    } catch (error) {
       next(error);
    }

}
export const getTrain = async(req,res,next)=>{
    try {

        const {departureStation,arrivalStation,departureDate} = req.query;
        const startOfDay = new Date(departureDate);
        startOfDay.setUTCHours(0,0,0,0); // Start of the day (00:00:00)

        const endOfDay = new Date(departureDate);
        endOfDay.setUTCHours(23, 59, 59, 999); // End of the day (23:59:59)

        
        const train = await Train.find({
            departureStation,
            arrivalStation,
            departureTime: { $gte: startOfDay, $lt: endOfDay },
        });
        res.status(200).json(train);

    } catch (error) {
       next(error);
    }

}
export const getBus = async(req,res,next)=>{
    try {

        const {departureStation,arrivalStation,departureDate} = req.query;
        const startOfDay = new Date(departureDate);
        startOfDay.setUTCHours(0,0,0,0); // Start of the day (00:00:00)
        const endOfDay = new Date(departureDate);
        endOfDay.setUTCHours(23, 59, 59, 999); // End of the day (23:59:59)
        const bus = await Bus.find({
            departureStation:departureStation,
            arrivalStation,
            departureTime: { $gte: startOfDay, $lt: endOfDay },
        });
        res.status(200).json(bus);

    } catch (error) {
       next(error);
    }

}
export const getBus1 = async(req,res,next)=>{
    try {

        const {duration,totalSeats} = req.query;
        console.log(req.query);
        const query = {...req.query};
        const exclude = ["duration","totalSeats"];
        exclude.forEach(el => {
            delete query[el];
        });
        // delete query.duration;
        console.log(req.query);
        console.log(query);

        const bus = await Bus.find({
            totalSeats,
            duration,
        });
        res.status(200).json(bus);

    } catch (error) {
       next(error);
    }

}
export const getHotel = async(req,res,next)=>{
    try {
        const {city} = req.query;
        const hotel = await Hotel.find({
           "location.city":city,
        });
        res.status(200).json(hotel);
    } catch (error) {
       next(error);
    }
}
export const getHoliday = async(req,res,next)=>{
    try {

        const {city} = req.query;
    //    console.log(city);
        const holiday = await Holiday.find({
           "destination.city" :city,
        });
        res.status(200).json(holiday);

    } catch (error) {
       next(error);
    }

}
