const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    destination: { type: String, required: true },
    days: { type: Number, required: true },
    budgetType: { type: String, required: true },
    interests: [String],
    itinerary: { type: Object },
    estimatedBudget: { type: Object },
    hotels: [Object],
    packingList: { type: [String], default: [] } // Keep packing list if you want it
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);