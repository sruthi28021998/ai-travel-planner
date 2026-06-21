const optimizeForWeather =
(itinerary) => {

  const replacements = {

    Hiking:
      "National Museum",

    Beach:
      "Aquarium Visit",

    Trekking:
      "Art Gallery",

    Park:
      "Indoor Shopping Mall",

    Camping:
      "Science Museum"

  };

  const updated = {};

  Object.keys(
    itinerary
  ).forEach(day => {

    updated[day] =
      itinerary[day].map(
      activity => {

        return (
          replacements[
            activity
          ] || activity
        );

      });

  });

  return updated;

};

module.exports = {
  optimizeForWeather
};