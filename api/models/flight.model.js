import mongoose from "mongoose"

const flightSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  airline: {
    type: String,
    required: true
  },
  departureAirport: {
    type: String,
    required: true
  },
  arrivalAirport: {
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
    type: Number, // In minutes
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  availableSeats: {
    type: Number,
    required: true
  },
  aircraftType: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Delayed', 'Cancelled', 'Departed', 'Arrived'],
    default: 'Scheduled'
  },
  classAvailability: {
    economy: { type: Number, default: 0 },
    business: { type: Number, default: 0 },
    firstClass: { type: Number, default: 0 }
  },
  baggageAllowance: {
    carryOn: { type: Number, default: 7 }, // in kg
    checked: { type: Number, default: 20 } // in kg
  }
}, { timestamps: true });

const Flight = mongoose.model('Flight', flightSchema);

// module.exports = Flight;
export default Flight;
