/* eslint-disable react/prop-types */
function RatingReview({ rating, setRating, handleReview, textSize, ...props }) {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star, i) => {
        return (
          <span
            key={i}
            className={`start cursor-pointer ${textSize} ${
              rating >= star
                ? "text-green-600 hover:text-green-700"
                : "text-gray-500 hover:text-gray-600"
            }`}
            onClick={() => {
              setRating(star);
              handleReview(star);
            }}
            {...props}
          >
            {" "}
            ★{" "}
          </span>
        );
      })}
    </div>
  );
}

export default RatingReview;
