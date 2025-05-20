/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loading_gif from "../../assets/loading-gif.gif";
import loadin_gif2 from "../../assets/Please_wait.gif";

export default function CreateProducts({ takeCardStatus }) {
  //console.log(takeCardStatus);
  const [loading, setIsloading] = useState(false);

  const navigate = useNavigate();

  const handleSubmission = (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    postRequest(data);
    setIsloading(true);
  };

  const postRequest = async (data) => {
    let obed = data;
    obed.productAdvertMessage = obed.productAdvertMessage.replace(
      /\*(.*?)\*/g,
      "<strong style=`display:contents >$1</strong>"
    );

    await axios
      .post("http://localhost:3000/klinchem/createProduct", obed, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        //console.log(response);
        takeCardStatus(response.statusText);
        navigate("/products");
      })
      .catch((error) => {
        takeCardStatus("error");
        navigate("/products");
        throw new Error(error);
      });
  };
  return (
    <>
      <h2 className="animate-flyin decoration-underline  mt-8 font-Montserrat font-semibold  text-[1.5em] text-blue-950 flex justify-center items-center">
        ADD PRODUCTS
      </h2>
      <section className="animate-flyin flex item-center justify-center animate-fly-in duration-500">
        <form
          className="w-[60%] flex flex-col "
          onSubmit={handleSubmission}
          encType="multipart/form-data"
        >
          <section className="flex flex-col text-black">
            <div className="flex flex-col  mb-2">
              <label className="flex item-start">Product Name</label>
              <input
                className="border border-gray-900 rounded "
                type="text"
                name="productName"
                placeholder=" ProductName"
                required
              />
            </div>
            <div className="flex flex-col mb-2">
              <label className="flex item-start">Price</label>
              <input
                className="border border-gray-900 rounded "
                placeholder=" Price"
                type="text"
                name="productPrice"
              />
            </div>

            <div className="flex flex-col mb-2">
              <label className="flex item-start">Description</label>
              <input
                className="border border-gray-900 rounded "
                type="text"
                placeholder=" Desceribe product in few words"
                name="productDescription"
                required
              />
            </div>
            <div className="flex flex-col mb-2">
              <label className="flex item-start">Full Description</label>
              <textarea
                name="productAdvertMessage"
                className="border border-gray-900 rounded "
                id="productAdvertMessage"
                placeholder=" Desceribe product in full words"
                required
              ></textarea>
            </div>
            <div className="flex flex-col mt-4 mb-2">
              <input
                className="border border-gray-900 rounded "
                type="file"
                name="productImage"
                required
              />
            </div>
            <button
              type="submit"
              className={` hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-opacity-50  flex-row justify-center items-center mt-2 p-1 flex self-start border ${
                loading && "text-gray-300 bg-gray-800"
              } border-gray-700 bg-black text-gray-50 rounded 
              }`}
              disabled={loading}
            >
              Add Product{" "}
              {loading && (
                <img
                  src={loading_gif}
                  alt="loadin-gif"
                  className="h-4 w-4 rounded ml-1"
                />
              )}
            </button>
          </section>
        </form>
      </section>
      {loading && (
        <p className="text-blue-800 flex justify-center items-center flex-col">
          <img src={loadin_gif2} alt={loadin_gif2} className="w-10 h-10 " />
          Please Wait.....
        </p>
      )}
    </>
  );
}
