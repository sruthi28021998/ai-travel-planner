"use client";

export default function DayCard({
  day,
  activities,
  removeActivity,
  regenerateDay
}) {

  return (
    <div
      className="
      border
      rounded-xl
      p-4
      bg-gray-50"
    >
      <div
        className="
        flex
        justify-between
        items-center"
      >
        <h3
          className="
          text-xl
          font-bold"
        >
          {day}
        </h3>

        <button
          onClick={() =>
            regenerateDay(day)
          }
          className="
          bg-blue-600
          text-white
          px-3
          py-1
          rounded"
        >
          Regenerate
        </button>
      </div>

      <div className="mt-4">
        {activities.map(
          (
            activity,
            index
          ) => (
            <div
              key={index}
              className="
              flex
              justify-between
              mb-2"
            >
              <span>
                {activity}
              </span>

              <button
                onClick={() =>
                  removeActivity(
                    day,
                    index
                  )
                }
                className="
                text-red-500"
              >
                Remove
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}