/* eslint-disable react/prop-types */
import { useState } from "react";
import { NavLink } from "react-router-dom";
export default function Dropdown({
  mainTitle,
  link1,
  link2,
  linkName1,
  linkName2,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left ">
      <div className="rounded">
        <button
          type="button"
          className="inline-flex justify-center w-full  shadow-sm px-4 py-2 text-sm font-medium text-gray-50"
          onClick={toggleDropdown}
        >
          {mainTitle}
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg  bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <NavLink
              to={link1}
              className={`text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100`}
              onClick={toggleDropdown}
            >
              {linkName1}
            </NavLink>

            <NavLink
              to={link2}
              className={`text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100`}
              onClick={toggleDropdown}
            >
              {linkName2}
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}
