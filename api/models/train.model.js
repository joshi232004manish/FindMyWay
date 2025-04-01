import mongoose from "mongoose"

const trainSchema = new mongoose.Schema({
  trainNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  trainName: {
    type: String,
    required: true
  },
  departureStation: {
    type: String,
    required: true
  },
  arrivalStation: {
    type: String,
    required: true
  },
  departureTime: {
    type: Date,
    required: true
  },
  arrivalTime: {
    type: Date,
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  availableSeats: {
    type: Number,
    required: true
  },
  classAvailability: {
    sleeper: { type: Number, default: 0 },
    AC3: { type: Number, default: 0 },
    AC2: { type: Number, default: 0 },
    AC1: { type: Number, default: 0 }
  },
  price: {
    sleeper: { type: Number },
    AC3: { type: Number },
    AC2: { type: Number },
    AC1: { type: Number }
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Delayed', 'Cancelled', 'Departed', 'Arrived'],
    default: 'Scheduled'
  }
}, { timestamps: true });

const Train = mongoose.model('Train', trainSchema);


export default Train ;
