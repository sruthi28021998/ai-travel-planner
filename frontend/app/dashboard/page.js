"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import TripCard from "../../components/TripCard";

export default function DashboardPage() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  const fetchTrips = async () => {
    // Only attempt to fetch if we have a token
    if (!user?.token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/trips", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      // 1. Get raw text to safely inspect the response
      const text = await response.text();

      // 2. If the response isn't OK, log the raw HTML/text error
      if (!response.ok) {
        console.error("Server returned an error:", text);
        throw new Error(`Server status ${response.status}`);
      }

      // 3. Only parse if we are sure it's valid JSON
      const data = text ? JSON.parse(text) : [];
      
      // 4. Robust state update
      setTrips(Array.isArray(data) ? data : (data.trips || []));
    } catch (error) {
      console.error("Failed to fetch trips:", error);
      setTrips([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    fetchTrips();
  }, [user, router]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this trip?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/trips/${id}`, {
        method: "DELETE",
        headers: { 
          "Authorization": `Bearer ${user.token}`,
          "Content-Type": "application/json"
        },
      });

      if (response.ok) {
        setTrips(trips.filter((t) => t._id !== id));
      } else {
        alert("Failed to delete trip");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error connecting to server");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading your trips...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Travel Dashboard</h1>

      <button
        onClick={() => router.push("/create-trip")}
        className="bg-green-600 text-white px-6 py-2 rounded-lg mb-8 hover:bg-green-700"
      >
        + Create New Trip
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(trips) && trips.length > 0 ? (
          trips.map((trip) => (
            <TripCard
              key={trip._id}
              trip={trip}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-gray-500">No trips found. Start by creating a new itinerary!</p>
        )}
      </div>
    </div>
  );
}