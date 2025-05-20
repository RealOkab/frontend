/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { /* React, */ useState } from "react";
import { NavLink } from "react-router-dom";
//import Button from "./Button";
import cartIcon from "../assets/cart.avif";
import Dropdown from "./DropDown";

export default function NavBar({ cartItems, handleModalState }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckOut = () => {
    handleModalState(true);
  };

  const handleHamburger = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className=" flex relative w-full justify-center items-center self-center justify-self-center">
      {" "}
      <nav className="rounded z-50 sticky top-0 bg-black text-gray-50 w-[95%] flex items-center justify-between shadow shadow-gray-50 ">
        <section
          onClick={handleHamburger}
          className=" ml-2 sm:hidden border border-gray-50  flex justify-center items-center flex-col rounded"
        >
          <div className="border border-gray-50 w-6 bg-white m-1"></div>
          <div className="border border-gray-50 w-6 bg-white m-1"></div>
          <div className="border border-gray-50 w-6 bg-white m-1"></div>
        </section>

        <div className={`  hidden sm:flex flex-row justify-around w-2/3`}>
          <Dropdown
            mainTitle={`Product`}
            link1={"/products/new"}
            linkName1={`New Product`}
            link2={`/products`}
            linkName2={`All products`}
          />

          <Dropdown
            mainTitle={`Blog`}
            link1={"/klinchem/products_blog"}
            linkName1={`Blog`}
            link2={`/klinchem/products_blog/new`}
            linkName2={`New Blog`}
          />

          <Dropdown
            mainTitle={`Reviews`}
            link1={"/klinchem/ProductReviews/new"}
            linkName1={`New Review`}
            link2={`/klinchem/products_reviews`}
            linkName2={`All Reviews`}
          />
        </div>

        <div className="w-1/3 flex justify-end ">
          <button
            className={`text-white flex flex-row  text-center justify-center border-l-4`}
            onClick={handleCheckOut}
          >
            <img
              src={cartIcon}
              className="w-8 h-8 rounded border  border-gray-700  m-1 "
              alt="cart-image"
            />
            <p className="font-Montserrat font-semibold text-center items-center self-center mr-1">
              <span className="text-green-500 text-[15px] mr-4">
                {cartItems.length}
              </span>
            </p>
          </button>
        </div>
      </nav>
      <section
        className={`${!isOpen && "hidden"} w-[95%] animate-flyin  sm:hidden`}
      >
        <div
          className="bg-black z-[150] w-[95%] absolute  rounded h-[100vh] opacity-9  "
          onClick={handleHamburger}
        >
          <div className=" flex  justify-around flex-col items-center h-[50%] text-gray-50 opacity-90 border-t-4 ">
            <NavLink to="/products/new">New Product</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/klinchem/products_blog">Blog</NavLink>
            <NavLink to="/klinchem/products_reviews">Reviews</NavLink>
          </div>
        </div>
      </section>
    </section>
  );
}
