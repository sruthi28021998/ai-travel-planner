const generateBudget = (
  destination,
  days,
  budgetType
) => {

  let flightCost = 400;
  let hotelPerDay = 50;
  let foodPerDay = 20;
  let activityPerDay = 15;

  if (budgetType === "Medium") {

    hotelPerDay = 100;
    foodPerDay = 35;
    activityPerDay = 30;

  }

  if (budgetType === "High") {

    hotelPerDay = 250;
    foodPerDay = 75;
    activityPerDay = 60;

  }

  const accommodation =
    hotelPerDay * days;

  const food =
    foodPerDay * days;

  const activities =
    activityPerDay * days;

  const total =
    flightCost +
    accommodation +
    food +
    activities;

  return {
    destination,
    flights: flightCost,
    accommodation,
    food,
    activities,
    total
  };

};

module.exports = {
  generateBudget
};