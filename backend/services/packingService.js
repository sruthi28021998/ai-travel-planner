// backend/services/packingService.js
const generatePackingList = (destination = "", interests = []) => {
  const baseItems = ["Passport/ID", "Charger", "Wallet", "First Aid Kit"];
  let suggestions = new Set(baseItems);

  // 1. Normalize inputs
  const dest = (destination || "").toLowerCase();
  
  // Handle both array of strings OR array of objects
  const activityTags = (Array.isArray(interests) ? interests : []).map(i => 
    (typeof i === 'string' ? i : i.label || "").toLowerCase()
  );

  // 2. Logic for Beaches (triggered by Destination OR Interests)
  if (dest.includes("beach") || dest.includes("coastal") || dest.includes("sea") || activityTags.includes("beach")) {
    ["Swimsuit", "Sunscreen", "Beach Towel", "Sunglasses", "Flip-flops"].forEach(item => suggestions.add(item));
  }

  // 3. Logic for Mountains/Trekking
  if (dest.includes("mountain") || dest.includes("hill") || activityTags.includes("trekking") || activityTags.includes("hiking")) {
    ["Hiking boots", "Backpack", "Water bottle", "Sun hat"].forEach(item => suggestions.add(item));
  }

  // 4. Logic for Photography
  if (activityTags.includes("photography")) {
    ["Camera", "Tripod", "Memory cards"].forEach(item => suggestions.add(item));
  }

  return Array.from(suggestions);
};

module.exports = { generatePackingList };