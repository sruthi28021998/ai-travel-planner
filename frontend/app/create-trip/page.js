"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function CreateTripPage() {
  const [formData, setFormData] = useState({
    destination: "",
    days: "",
    budgetType: "Medium",
    interests: "",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleGenerateTrip = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // 1. Extract token safely without destroying JWT structure
    let rawToken = user?.token;
    
    // If your context stores it as an object (e.g., { token: "..." }), extract the value
    const token = (typeof rawToken === 'object' && rawToken !== null) 
                  ? (rawToken.token || "") 
                  : (rawToken || "");

    // 2. Validate existence
    if (!token || token.split('.').length !== 3) {
      console.error("Malformed token detected:", token);
      alert("Invalid session. Please log in again.");
      router.push("/login");
      return;
    }

    const response = await fetch("http://localhost:5000/api/trips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // The space after Bearer is critical
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify({
        ...formData,
        interests: formData.interests ? formData.interests.split(",").map((i) => i.trim()) : [],
      }),
    });

    
      if (!response.ok) {
        const text = await response.text(); // This captures the HTML/Error page
        console.log("Raw Server Response:", text); // Check this in your browser console
        throw new Error("Server returned non-JSON. Check the Browser Console for the HTML response.");
      }

    alert("Trip generated successfully!");
    router.push("/dashboard");
  } catch (error) {
    console.error("Fetch Error:", error);
    alert("Error: " + error.message);
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-5">Create Trip</h1>
      <form onSubmit={handleGenerateTrip} className="space-y-4">
        <input className="border p-2 w-full" placeholder="Destination" onChange={(e) => setFormData({...formData, destination: e.target.value})} required />
        <input className="border p-2 w-full" placeholder="Number of Days" type="number" onChange={(e) => setFormData({...formData, days: e.target.value})} required />
        <select className="border p-2 w-full" onChange={(e) => setFormData({...formData, budgetType: e.target.value})}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input className="border p-2 w-full" placeholder="Interests (e.g. Food, Culture)" onChange={(e) => setFormData({...formData, interests: e.target.value})} />
        <button disabled={loading} className="bg-green-600 text-white p-3 w-full rounded">
          {loading ? "Generating..." : "Generate Trip"}
        </button>
      </form>
    </div>
  );
}