import Navbar
from "../components/Navbar";

export default function Home() {

  return (
    <>

      <Navbar />

      <div
        className="
        flex
        justify-center
        items-center
        h-screen"
      >

        <div
          className="
          text-center"
        >

          <h1
            className="
            text-5xl
            font-bold"
          >
            AI Travel Planner
          </h1>

          <p
            className="
            mt-4"
          >
            Generate AI Powered
            Travel Itineraries
          </p>

        </div>

      </div>

    </>
  );

}