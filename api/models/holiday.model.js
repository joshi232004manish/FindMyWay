import mongoose from "mongoose"

const holidaySchema = new mongoose.Schema({
  packageName: {
    type: String,
    required: true,
    trim: true
  },
  destination: {
    country: { type: String, required: true },
    city: { type: String, required: true }
  },
  duration: {
    days: { type: Number, required: true },
    nights: { type: Number, required: true }
  },
  price: {
    perPerson: { type: Number, required: true },
    childDiscount: { type: Number, default: 0 }, // Discount for children in percentage
    groupDiscount: { type: Number, default: 0 } // Discount for large groups in percentage
  },
  itinerary: [{
    day: { type: Number, required: true },
    activities: { type: [String], default: [] },
    accommodation: { type: String },
    mealsIncluded: { type: Boolean, default: false }
  }],
  accommodation: {
    hotelName: { type: String },
    roomType: { type: String } // e.g., 'Single', 'Double', 'Suite'
  },
  transport: {
    mode: {
      type: String,
      enum: ['Flight', 'Train', 'Bus', 'Private Car'],
      required: true
    },
    details: { type: String } // Example: "Air India AI-202"
  },
  availableSeats: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Available', 'Fully Booked', 'Cancelled'],
    default: 'Available'
  },
  inclusions: {
    type: [String], // Example: ['Meals', 'Sightseeing', 'Airport Transfers']
    default: []
  },
  exclusions: {
    type: [String], // Example: ['Visa', 'Personal Expenses']
    default: []
  },
  rating: {
    type: Number, // Average customer rating (1–5)
    min: 0,
    max: 5,
    default: 0
  }
}, { timestamps: true });

const Holiday = mongoose.model('Holiday', holidaySchema);

// module.exports = Holiday;
export default Holiday;
