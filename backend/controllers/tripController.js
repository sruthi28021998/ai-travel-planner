const Trip = require("../models/Trip");
const { generateItinerary } = require("../services/aiService");
const { generateBudget } = require("../services/budgetService");
const { getHotels } = require("../services/hotelService");
const { generatePackingList } = require("../services/packingService");

const createTrip = async (req, res) => {
  try {
    const { destination, days, budgetType, interests } = req.body;
    
    // Generate components
    const itinerary = await generateItinerary(destination, days, interests, budgetType);
    const estimatedBudget = generateBudget(destination, Number(days), budgetType);
    const hotels = getHotels(destination, budgetType);
    
    // Generate packing list based on trip details
    const packingList = generatePackingList(destination, interests);

    // Save to database
    const trip = await Trip.create({
      user: req.user.id,
      destination,
      days,
      budgetType,
      interests,
      itinerary,
      estimatedBudget,
      hotels,
      packingList
    });

    return res.status(201).json(trip);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMyTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.json(trips);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user.id });
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    return res.json(trip);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user.id });
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    
    trip.itinerary = req.body.itinerary;
    await trip.save();
    return res.json(trip);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user.id });
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    
    await Trip.deleteOne({ _id: trip._id });
    return res.json({ message: "Trip deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const regenerateDay = async (req, res) => {
  try {
    const { day, instruction } = req.body;
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user.id });
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    trip.itinerary[day] = [
      `AI Activity 1 (${instruction})`,
      `AI Activity 2 (${instruction})`,
      `AI Activity 3 (${instruction})`
    ];
    
    // Mark itinerary as modified since it's an Object type in Mongoose
    trip.markModified('itinerary');
    await trip.save();
    
    return res.json(trip);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTrip,
  getMyTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  regenerateDay,
};