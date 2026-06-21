const getHotels = (
  destination,
  budgetType
) => {

  if (budgetType === "Low") {

    return [
      {
        name: `${destination} Budget Inn`,
        rating: 4.2,
        category: "Budget"
      },
      {
        name: `${destination} Backpackers Stay`,
        rating: 4.1,
        category: "Budget"
      }
    ];

  }

  if (budgetType === "Medium") {

    return [
      {
        name: `${destination} Grand Hotel`,
        rating: 4.5,
        category: "Mid Range"
      },
      {
        name: `${destination} City Comfort`,
        rating: 4.4,
        category: "Mid Range"
      }
    ];

  }

  return [
    {
      name: `${destination} Imperial Palace`,
      rating: 4.9,
      category: "Luxury"
    },
    {
      name: `${destination} Royal Resort`,
      rating: 4.8,
      category: "Luxury"
    }
  ];

};

module.exports = {
  getHotels
};