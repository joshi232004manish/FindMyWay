import mongoose from "mongoose";

const cotravellerSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        gender:{
            type:String,
            required:true,
        },
        birthday:{
            type:String,
            required:true,
        },
        phone:{
            type:String,
            default:"N/A"
        },
        email:{
            type:String,
            default:"N/A"
        }

    },
    {timestamps:true}

);

const Cotraveller = mongoose.model('Cotraveller',cotravellerSchema);
export default Cotraveller;