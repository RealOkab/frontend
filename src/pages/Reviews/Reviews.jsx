import { useEffect, useState } from "react";
import axios from "axios";
import Review from "../../components/Reviews";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const getReviews = async () => {
      await axios
        .get("http://localhost:3000/klinchem/ProductReviews")
        .then((response) => {
          setReviews(response.data);
        })
        .catch((error) => {
          throw new Error(error);
        });
    };

    getReviews();
  }, []);

  return (
    <div className="animate-fly-in duration-500 text-black flex items-center justify-center mt-6">
      <section className="w-[80%]">
        <h1 className="text-blue-700 text-[2em]">All Reviews</h1>

        {reviews.length > 0 &&
          reviews.map((review) => (
            <Review
              key={review._id}
              commentDate={review.commentDate.slice(0, 10)}
              product={review.productReviewed}
              reviewer={review.reviewer}
              email={review.email}
              comment={review.comment}
              rate={review.rate}
              _id={review._id}
            />
          ))}
      </section>
    </div>
  );
}
