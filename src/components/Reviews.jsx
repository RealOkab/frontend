/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import RatingReview from "./RatingReview";
import Button from "./Button";
import Modal from "./Modal";
import axios from "axios";
import { useState } from "react";

export default function Reviews({
  reviewer,
  email,
  comment,
  rate,
  product,
  commentDate,
  _id,
}) {
  const navigate = useNavigate();
  const [confirmDeletion, setConfirmDeletion] = useState({
    initialConfirmation: false,
  });

  const handleReviewUpdate = () => {
    navigate(`/klinchem/ProductReviews/${_id}/update`);
  };

  const handleDeletion = () => {
    // console.log("clicked", userId.id);
    setConfirmDeletion((prevState) => {
      return {
        ...prevState,
        initialConfirmation: true,
      };
    });
  };

  const handleCancelDeletion = () => {
    setConfirmDeletion((prevState) => {
      return {
        ...prevState,
        initialConfirmation: false,
      };
    });
  };

  const hanldeProceedDeleteion = async () => {
    await axios
      .delete(`http://localhost:3000/klinchem/deleteRreview/${_id}/delete`)
      .then(() => {
        navigate("/klinchem/products_reviews/success");
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
  return (
    <>
      <div className="flex flex-col mt-4 mb-4 w-[70%]">
        {confirmDeletion.initialConfirmation && (
          <Modal
            open={true}
            className={` bg-opacity-30 z-50  flex justify-center items-center rounded  `}
          >
            <div
              className="flex justify-center items-center  rounded 
         h-[20vh] w-[80vw] "
            >
              <div className="flex flex-col w-[100%] self-start  rounded">
                <h3 className=" font-semibold text-blue-500 text-[1.5em] ml-4 ">
                  Deletion
                  <p className="font-Khula font-light text-[0.5em] text-black">
                    Do you want to proceed? This action cannnot be undone
                  </p>
                </h3>
              </div>
              <section className="flex flex-row  w-[100%] self-end ">
                <Button
                  className="bg-red-500 rounded text-gray-50 ml-1 mr-1 p-2 mb-4 "
                  type="button"
                  onClick={hanldeProceedDeleteion}
                >
                  Confirm
                </Button>
                <Button
                  className={`bg-blue-600 rounded text-gray-50  ml-1 mr-1  p-2  mb-4 `}
                  type="button"
                  onClick={handleCancelDeletion}
                >
                  Cancel
                </Button>
              </section>
            </div>
          </Modal>
        )}
        <h2 className="font-extralight text-[12px] underline">{commentDate}</h2>
        <h2 className="font-semibold">
          {reviewer} <span className="text-[12px] font-thin"> reviewing -</span>
          <span className="text-blue-700 text-[12px]"> {product}</span>
        </h2>
        <RatingReview rating={rate} textSize={`text-[15px]`} />

        <h3 className="text-[15px] text-gray-500 font-light">{email}</h3>
        <h4>{comment}</h4>
      </div>
      <div>
        <button
          className="bg-blue-600 text-white p-1 rounded text-[.8em] mr-1 "
          onClick={handleReviewUpdate}
        >
          Update
        </button>
        <button
          className="bg-red-600 text-white p-1 rounded text-[.8em] ml-1"
          onClick={handleDeletion}
        >
          Delete
        </button>
      </div>
    </>
  );
}
