"use client";

import { useEffect, useState, use } from "react";
import Navbar from "../../../components/Navbar";
import ProtectedRoute from "../../../components/ProtectedRoute";
import DayCard from "../../../components/DayCard";
import HotelCard from "../../../components/HotelCard";
import API from "../../../services/api";

export default function TripDetails({ params }) {
  const { id } = use(params);
  
  const [trip, setTrip] = useState(null);

  const loadTrip = async () => {
    try {
      const res = await API.get(`/trips/${id}`);
      setTrip(res.data);
    } catch (error) {
      console.error("Failed to load trip:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (id) loadTrip();
  }, [id]);

  const removeActivity = async (day, index) => {
    if (!trip) return;
    const itinerary = { ...trip.itinerary };
    itinerary[day].splice(index, 1);
    await API.put(`/trips/${trip._id}`, { itinerary });
    loadTrip();
  };

  const regenerateDay = async (day) => {
    if (!trip) return;
    await API.post(`/trips/${trip._id}/regenerate`, {
      day,
      instruction: "More outdoor activities"
    });
    loadTrip();
  };

  if (!trip) return <p className="p-8">Loading trip details...</p>;

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="p-8">
        <h1 className="text-4xl font-bold">{trip.destination}</h1>

        {/* --- ITINERARY --- */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Itinerary</h2>
          <div className="grid gap-4 mt-4">
            {Object.keys(trip.itinerary).map((day) => (
              <DayCard
                key={day}
                day={day}
                activities={trip.itinerary[day]}
                removeActivity={removeActivity}
                regenerateDay={regenerateDay}
              />
            ))}
          </div>
        </div>

        {/* --- PACKING LIST --- */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Recommended Packing List</h2>
          <ul className="list-disc ml-6 mt-4">
            {trip.packingList?.map((item, index) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        </div>

        {/* --- BUDGET --- */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Budget</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto mt-4">
            {JSON.stringify(trip.estimatedBudget, null, 2)}
          </pre>
        </div>

        {/* --- HOTELS --- */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Hotels</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            {trip.hotels.map((hotel, index) => (
              <HotelCard key={index} hotel={hotel} />
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}