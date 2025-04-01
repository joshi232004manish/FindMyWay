import mongoose from "mongoose"

const busSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  busOperator: {
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
    type: Number, 
    required: true
  },
  totalSeats: {
    type: Number,
    required: true
  },
  availableSeats: {
    type: Number,
    required: true
  },
  seatTypes: {
    sleeper: { type: Number, default: 0 },
    semiSleeper: { type: Number, default: 0 },
    AC: { type: Number, default: 0 },
    nonAC: { type: Number, default: 0 }
  },
  price: {
    sleeper: { type: Number },
    semiSleeper: { type: Number },
    AC: { type: Number },
    nonAC: { type: Number }
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Delayed', 'Cancelled', 'Departed', 'Arrived'],
    default: 'Scheduled'
  }
}, { timestamps: true });

const Bus = mongoose.model('Bus', busSchema);

// module.exports = Bus;
export default Bus;
