export default function HotelCard({
  hotel
}) {

  return (
    <div
      className="
      border
      rounded-xl
      shadow
      p-4"
    >
      <h3
        className="
        text-lg
        font-bold"
      >
        {hotel.name}
      </h3>

      <p>
        Category:
        {hotel.category}
      </p>

      <p>
        Rating:
        {hotel.rating}
      </p>
    </div>
  );
}