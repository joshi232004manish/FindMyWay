import mongoose from "mongoose"

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    city: { type: String, required: true },
    address: { type: String, required: true }
  },
  rooms: [{ 
    type: {
      type: String, // e.g., 'Single', 'Double', 'Suite'
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    availableCount: {
      type: Number,
      required: true
    },
    amenities: {
      type: [String],
      default: []
    }
  }],
  rating: {
    type: Number, // 0 - 5 stars
    min: 0,
    max: 5,
    required: true
  },
  checkInTime: {
    type: String,
    required: true
  },
  checkOutTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Open', 'Closed', 'Under Maintenance'],
    default: 'Open'
  }
}, { timestamps: true });

const Hotel = mongoose.model('Hotel', hotelSchema);

// module.exports = Hotel;
export default Hotel;
