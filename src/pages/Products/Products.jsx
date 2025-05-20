/* eslint-disable react/prop-types */
//import react from "@vitejs/plugin-react-swc";

import axios from "axios";
import { useEffect, useState } from "react";
import Product from "../../components/Product";
import Cart from "../../components/Cart";
import FlashCards from "../../components/FlashCards";

export default function Products({
  getCartItems,
  cartItems,
  modalStatus,
  handleModalState2,
  flashCardStatus,
  nullifyFlashCardStataus,
  handleCartData,
}) {
  const [allProducts, setAllProducts] = useState([]);

  const url = "http://localhost:3000/klinchem/products";

  useEffect(() => {
    const fetchProduct = async () => {
      await axios
        .get(url)
        .then((response) => {
          //console.log(response);
          setAllProducts((prevState) => {
            return [...prevState, response.data];
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };

    let timer = setTimeout(() => {
      nullifyFlashCardStataus("");
      return () => {
        clearTimeout(timer);
      };
    }, 5000);

    return fetchProduct;
  }, [nullifyFlashCardStataus]);

  const fetchCartItems = (addItem) => {
    getCartItems(addItem);
  };

  const handleModalStatus2 = (status) => {
    handleModalState2(status);
  };
  const sendData = (val) => {
    handleCartData(val);
  };

  return (
    <>
      <section className=" animate-fly-in duration-500 flex flex-row flex-wrap justify-center items-center animate-flyin animate-flyin-duration-500  animate-flyin-delay-500 w-[100%]">
        <Cart
          cartItems={cartItems}
          modalStatus={modalStatus}
          handleModalStatus2={handleModalStatus2}
          sendData={sendData}
        />

        {allProducts[0] &&
          allProducts[0].map((e) => (
            <Product
              productName={e.productName}
              key={e.productName}
              productDescription={e.productDescription}
              productPrice={e.productPrice}
              productImage={e.productImage}
              getCartItems={fetchCartItems}
              cartItems={cartItems}
              productId={e._id}
            />
          ))}
      </section>

      <div
        className={` flex justify-center items-center  bg-blue-500 text-gray-50  animate-flyin `}
      >
        <FlashCards
          className={
            " text-gray-50 flex flex-row z-50 shadow shadow-black" +
            ` ${flashCardStatus === "Created" && "bg-blue-500   "}  ${
              flashCardStatus === "error" && "bg-red-500   "
            } ${flashCardStatus === "" && "hidden"} `
          }
          message={
            (flashCardStatus === "Created" &&
              "Product successfully created!") ||
            (flashCardStatus === "error" &&
              "Error Failed to create Produc! Try again")
          }
        />
      </div>
    </>
  );
}
