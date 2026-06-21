"use client";

import Link from "next/link";

export default function TripCard({
  trip,
  onDelete
}) {

  return (
    <div
      className="
      bg-white
      rounded-xl
      shadow-lg
      p-5
      border"
    >
      <h2
        className="
        text-2xl
        font-bold"
      >
        {trip.destination}
      </h2>

      <p className="mt-2">
        {trip.days} Days
      </p>

      <p>
        Budget: {trip.budgetType}
      </p>

      <div
        className="
        flex
        gap-3
        mt-4"
      >
        <Link
          href={`/dashboard/${trip._id}`}
        >
          <button
            className="
            bg-blue-600
            text-white
            px-4
            py-2
            rounded"
          >
            View
          </button>
        </Link>

        <button
          onClick={() =>
            onDelete(trip._id)
          }
          className="
          bg-red-500
          text-white
          px-4
          py-2
          rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}