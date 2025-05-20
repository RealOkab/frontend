import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loading_gif from "../../assets/loading-gif.gif";
import loadin_gif2 from "../../assets/Please_wait.gif";
import { useParams } from "react-router-dom";

export default function CreateProducts() {
  const [loading, setIsloading] = useState(false);
  const [showProduct, setShowProduct] = useState({});

  const navigate = useNavigate();

  const userId = useParams();

  const handleSubmission = (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    //console.log(data);
    //return;
    postRequest(data);
    setIsloading(true);
  };

  const handleCancel = () => {
    navigate("/products");
  };

  const postRequest = async (data) => {
    data.productAdvertMessage = data.productAdvertMessage.replace(
      /\*(.*?)\*/g,
      "<strong>$1</strong>"
    );
    console.log(data);

    await axios
      .put(`http://localhost:3000/klinchem/${userId.id}/editProduct`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log(response.data);
        navigate("/products");
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3000/klinchem/${userId.id}/editProduct`)
      .then((response) => {
        //console.log(response.data);
        setShowProduct(response.data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, [userId]);
  return (
    <>
      <h2 className="animate-flyin decoration-underline  mt-8 font-Montserrat font-semibold  text-[1.5em] text-blue-950 flex justify-center items-center">
        EDIT PRODUCT
      </h2>
      <section className="flex item-center justify-center animate-fly-in duration-500 animate-flyin">
        <form
          className="w-[60%] flex flex-col "
          onSubmit={handleSubmission}
          encType="multipart/form-data"
        >
          <section className="flex flex-col text-black">
            <div className="flex flex-col ">
              <label className="flex item-start">Product Name</label>
              <input
                className="border border-gray-900 rounded pl-1"
                type="text"
                name="productName"
                placeholder=" ProductName"
                required
                defaultValue={showProduct.productName}
              />
            </div>
            <div className="flex flex-col">
              <label className="flex item-start">Price</label>
              <input
                className="border border-gray-900 rounded pl-1"
                placeholder=" Price"
                type="number"
                name="productPrice"
                defaultValue={showProduct.productPrice}
              />
            </div>

            <div className="flex flex-col">
              <label className="flex item-start">Description</label>
              <input
                className="border border-gray-900 rounded pl-1 "
                type="text"
                placeholder=" Desceribe product in few words"
                name="productDescription"
                required
                defaultValue={showProduct.productDescription}
              />
            </div>
            <div className="flex flex-col">
              <label className="flex item-start">Full Description</label>
              <textarea
                name="productAdvertMessage"
                className="border border-gray-900 rounded pl-1 "
                id="productAdvertMessage"
                placeholder=" Desceribe product in full words"
                required
                defaultValue={showProduct.productAdvertMessage}
              ></textarea>
            </div>
            <div className="flex flex-col mt-4">
              <input
                className="border border-gray-900 rounded "
                type="file"
                name="productImage"
                required
              />
            </div>
            <section className="flex flex-row flex-start">
              <button
                type="submit"
                className={`  flex-row justify-center items-center mt-2 p-1 flex self-start border ${
                  loading && "text-gray-300 bg-gray-800"
                } border-gray-700 bg-blue-600 text-gray-50 rounded 
              }`}
                disabled={loading}
              >
                Update{" "}
                {loading && (
                  <img
                    src={loading_gif}
                    alt="loadin-gif"
                    className="h-4 w-4 rounded ml-1"
                  />
                )}
              </button>

              <button
                type="button"
                className="bg-red-600 text-gray-50 mt-2 p-1 rounded ml-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </section>
          </section>
        </form>
      </section>
      {loading && (
        <p className="text-blue-800 flex justify-center items-center flex-col">
          <img src={loadin_gif2} alt={loadin_gif2} className="w-40 h-40 " />
          Please Wait.....
        </p>
      )}
    </>
  );
}
