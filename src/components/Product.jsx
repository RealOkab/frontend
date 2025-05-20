/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Button from "./Button";
import { formatGhanaCedis } from "../utils/helpers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Product({
  className,
  productName,
  productDescription,
  productPrice,
  productImage,
  productId,
  getCartItems,
  cartItems,
}) {
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    getCartItems({
      productName: productName,
      productPrice: productPrice,
      quantity: 1,
      disableButton: true,
    });
  };

  const handleDetails = () => {
    navigate(`/klinchem/${productId}/products_Details`);
  };

  useEffect(() => {
    cartItems.map((e) => {
      if (e.productName.includes(productName)) {
        setIsDisabled(true);
      }
    });
    return () => cartItems;
  }, [cartItems, productName]);

  return (
    <div className="shadow shadow-gray-950 flex flex-col justify-center items-center rounded  border bg-gray-50 border-gray-200 mt-2 m-2 w-60 h-96 p-2">
      <section className="flex flex-col text-center text-gray-950 ">
        <img
          src={
            "https://res.cloudinary.com/dyepzv7v1/image/upload/" + productImage
          }
          alt="product_image"
          className="h-32 w-32 rounded self-center"
        />

        <h2 className="text-[1.5em] font-semibold">{productName}</h2>
        <p className="font-Khula font-bold">{formatGhanaCedis(productPrice)}</p>
        <p className="text-[0.8em] font-Khula flex flex-wrap items-center justify-center text-center">
          {productDescription}
        </p>
      </section>
      <section className="flex flex-row  ">
        <Button
          disabled={isDisabled}
          onClick={handleAddToCart}
          className={` ${
            isDisabled ? "text-blue-400" : ""
          } bg-blue-950  text-gray-50 p-1 rounded mr-1 text-[10px] shadow shadow-blue-400`}
        >
          {isDisabled ? "Added to cart" : "Add to cart"}
        </Button>
        <Button
          onClick={handleDetails}
          className={`bg-blue-600 text-gray-100 ml-1 p-1 rounded text-[10px] shadow shadow-blue-950`}
        >
          Details
        </Button>
      </section>
    </div>
  );
}
