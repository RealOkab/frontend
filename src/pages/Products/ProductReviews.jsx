import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RatingReview from "../../components/RatingReview";

export default function ProductReviews() {
  const reviewId = useParams();
  const [filteredReviews, setFilteredReviews] = useState([]);

  useEffect(() => {
    const fectchProductReview = async () => {
      await axios
        .get(
          `http://localhost:3000/klinchem/product_reviews/${reviewId.id}/Review`
        )
        .then((response) => {
          console.log(response.data);
          setFilteredReviews(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fectchProductReview();
  }, [reviewId]);

  return (
    <div className="flex justify-center items-center flex-col self-center text-black w-[80%]">
      <h3 className="mt-4 text-blue-600 text-[1em]">
        {filteredReviews.product && filteredReviews.product.toUpperCase()}
        <h3 className="flex text-gray-950 text-[20px] justify-center items-center">
          Reviews
        </h3>
      </h3>
      {filteredReviews.filteredReveiw &&
        filteredReviews.filteredReveiw.map((reviews) => (
          <section key={reviews._id} className="mt-2 mb-4">
            <h2 className="font-extralight text-[12px] underline ">
              {reviews.commentDate.slice(0, 10)}
            </h2>

            <RatingReview rating={reviews.rate} textSize={`text-[20px]`} />

            <h3 className="text-[15px] text-gray-500 font-light">
              {reviews.email}
            </h3>
            <h4>{reviews.comment}</h4>
          </section>
        ))}
    </div>
  );
}
