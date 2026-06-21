const express = require("express");
const router = express.Router();

// 1. Remove optimizeTripWeather from the destructuring
const { 
    createTrip, 
    getMyTrips, 
    getTripById, 
    updateTrip, 
    deleteTrip, 
    regenerateDay 
} = require("../controllers/tripController");

const authMiddleware = require("../middleware/authMiddleware");

// 2. Define standard routes
router.post("/", authMiddleware, createTrip);
router.get("/", authMiddleware, getMyTrips);
router.get("/:id", authMiddleware, getTripById);
router.put("/:id", authMiddleware, updateTrip);
router.delete("/:id", authMiddleware, deleteTrip);
router.patch("/:id/regenerate", authMiddleware, regenerateDay);

// 3. REMOVE the router.patch("/:id/weather"...) line entirely

module.exports = router;