import { useState, useEffect } from "react";
import loading_gif from "../../assets/loading-gif.gif";
import loadin_gif2 from "../../assets/Please_wait.gif";
import RatingReview from "../../components/RatingReview";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateReviews() {
  const [loading, setIsloading] = useState(false);
  const [rating, setRating] = useState(0);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [review, setReview] = useState({
    productReviewed: "",
    comment: "",
    reviewer: "",
    email: "",
    rate: 0,
    commentDate: new Date().toISOString(),
  });

  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth() + 1; // Months are zero-based, so add 1
  const year = today.getFullYear();

  const postReviewFn = async () => {
    await axios
      .post("http://localhost:3000/klinchem/createReviews", review)
      .then((response) => {
        console.log(response.data);
        navigate("/klinchem/products_reviews");
      })
      .catch((err) => {
        console.log(err);
      });
    setIsloading(true);
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();

    postReviewFn();

    // console.log(review);
  };

  const handleFormChange = (evt, value) => {
    setReview((prevState) => {
      return {
        ...prevState,
        [value]: evt.target.value,
      };
    });
  };

  const handleReview = (val) => {
    setReview((prevState) => {
      return {
        ...prevState,
        rate: val,
        commentDate: `${month}/${date}/${year}`,
      };
    });
  };

  useEffect(() => {
    const getProducts = async () => {
      await axios
        .get("http://localhost:3000/klinchem/ProductReviews/new")
        .then((response) => {
          setProducts(response.data);
        })
        .catch((err) => {
          throw new Error(err);
        });
    };
    getProducts();
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center animate-flyin flex-col">
      <section className="w-[50%] ">
        <h1 className="flex justify-center items-center mb-8 text-blue-900 text-[2em]">
          Create Review
        </h1>
        <form encType="multipart/form-data" onSubmit={handleFormSubmission}>
          {" "}
          <div className="mb-4">
            {" "}
            <div className="mb-4">
              {" "}
              <label
                htmlFor="reviewer"
                className="block text-gray-700 font-medium mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                name="reviewer"
                className="text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950"
                onChange={(evt) => handleFormChange(evt, "reviewer")}
              />
            </div>
            <div className="mb-4">
              {" "}
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                className="text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950"
                onChange={(evt) => handleFormChange(evt, "email")}
              />
            </div>
            <div className="mb-4">
              {" "}
              <label
                htmlFor="productReviewed"
                className="block text-gray-700 font-medium mb-2"
              >
                Select Product
              </label>
              <select
                name="productReviewed"
                id="productReviewed"
                className="text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950"
                onChange={(evt) => handleFormChange(evt, "productReviewed")}
              >
                <option>Select</option>
                {products.length &&
                  products.map((product) => (
                    <option key={product._id}>{product.productName}</option>
                  ))}
              </select>
            </div>
            <label
              htmlFor="comment"
              className="block text-gray-700 font-medium mb-2"
            >
              Review
            </label>
            <textarea
              id="comment"
              name="comment"
              rows="6"
              className="text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950"
              placeholder="Enter your content here..."
              onChange={(evt) => handleFormChange(evt, "comment")}
              required
            ></textarea>{" "}
            <div className="mb-4">
              {" "}
              <label
                htmlFor="rate"
                className="block text-gray-700 font-medium mb-2"
              >
                Rate
              </label>
              <p className="text-black">Please rate the product</p>
              <RatingReview
                rating={rating}
                setRating={setRating}
                name="rate"
                handleReview={handleReview}
                textSize={`text-[35px]`}
              />{" "}
            </div>{" "}
          </div>{" "}
          <button
            disabled={loading}
            type="submit"
            className="w-full flex flex-row items-center justify-center bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-opacity-50"
          >
            Submit
            {loading && (
              <img
                src={loading_gif}
                alt="loadin-gif"
                className="h-4 w-4 rounded ml-1"
              />
            )}
          </button>{" "}
        </form>
      </section>
      {loading && (
        <p className="text-blue-800 flex justify-center items-center flex-col">
          <img src={loadin_gif2} alt={loadin_gif2} className="w-5 h-5 pt-1 " />
          Please Wait.....
        </p>
      )}
    </div>
  );
}
