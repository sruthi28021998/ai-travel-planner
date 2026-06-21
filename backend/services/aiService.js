const OpenAI =
require("openai");

const client =
new OpenAI({
  apiKey:
  process.env.OPENAI_API_KEY
});

const generateItinerary =
async (
  destination,
  days,
  interests,
  budgetType
) => {

  try {

    const prompt = `
Create a detailed travel itinerary.

Destination:
${destination}

Days:
${days}

Budget:
${budgetType}

Interests:
${interests.join(", ")}

Return valid JSON only.

Example:

{
 "Day 1":[
  "Visit Temple",
  "Food Tour"
 ],
 "Day 2":[
  "Museum",
  "Shopping"
 ]
}
`;

    const response =
      await client.chat.completions.create(
      {
        model:
        "gpt-4o-mini",

        messages: [
          {
            role: "user",
            content: prompt
          }
        ],

        temperature: 0.7
      }
    );

    const result =
      response.choices[0]
      .message.content;

    return JSON.parse(
      result
    );

  } catch (error) {

    console.error(error);

    return {

      "Day 1": [
        "City Tour",
        "Local Food Walk"
      ],

      "Day 2": [
        "Museum Visit",
        "Shopping"
      ]

    };

  }

};

module.exports = {
  generateItinerary
};