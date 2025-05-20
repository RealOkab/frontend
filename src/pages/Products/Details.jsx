/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Parser } from "html-to-react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import Button from "../../components/Button";

export default function Details() {
  const [showProduct, setShowProduct] = useState({});
  const [confirmDeletion, setConfirmDeletion] = useState({
    initialConfirmation: false,
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userId = useParams();
  const htmlParser = new Parser();

  //console.log(usableId);

  const handleEdit = () => {
    navigate(`/klinchem/${userId.id}/editProduct`);
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
      .delete(`http://localhost:3000/klinchem/${userId.id}/delete`)
      .then((response) => {
        navigate("/products");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleReviews = () => {
    navigate(`/klinchem/product_reviews/${userId.id}/Review`);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/klinchem/${userId.id}/products_Details`)
      .then((response) => {
        //console.log(response.data);
        setShowProduct(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [userId]);

  return (
    <div className="animate-flyin">
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
            {error && <p className="text-red-600 text-[0.8em]">{error}</p>}
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
      <section className="flex justify-center items-center flex-col">
        <h1 className=" w-max text-blue-950  font-Montserrat flex justify-center text-[1em] font-semibold mt-1 ">
          {showProduct.productName}
        </h1>
        <section className=" flex flex-col w-full">
          <img
            src={
              "https://res.cloudinary.com/dyepzv7v1/image/upload/" +
              showProduct.productImage
            }
            alt="product_image"
            className=" rounded justify-center items-center self-center h-52 w-[95%]"
          />
          <div className=" w-[100%] text-black text-left flex justify-center items-center text-[0.9em]  m-1 p-1">
            <p className="w-[95%]">
              {htmlParser.parse(showProduct.productAdvertMessage)}
            </p>
          </div>
        </section>
        <section className="flex flex-row w-[100%] justify-center items-center">
          <button
            className="bg-black text-white p-1 rounded ml-1"
            type="button"
            onClick={handleReviews}
          >
            Reviews
          </button>
          <button
            className="bg-blue-900 text-gray-50 p-1 rounded ml-1"
            type="button"
            onClick={handleEdit}
          >
            Edit Product
          </button>
          <button
            className="bg-red-700 text-gray-50 p-1 rounded m-1"
            type="button"
            onClick={handleDeletion}
          >
            Delete
          </button>
        </section>
      </section>
    </div>
  );
}
