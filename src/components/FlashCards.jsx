import { useState } from "react";
import { createPortal } from "react-dom";

export default function FlashCards({ message, className, ...prop }) {
  const [showFlashCard, setShowFlashCard] = useState(false);
  const handleCardVisibility = () => {
    setShowFlashCard(true);
  };

  return createPortal(
    <div
      className={
        className +
        ` flex  flex-row w-[50%] p-2 z-50  rounded ${
          showFlashCard && "hidden invisible"
        }  `
      }
    >
      <p className="w-[80%] justify-center items-center self-center">
        {message}
      </p>
      <div className="w-[20%] flex justify-end">
        <button
          {...prop}
          className=" flex justify-end items-end self-end  border border-double  p-1 rounded font-bold"
          onClick={handleCardVisibility}
        >
          X
        </button>
      </div>
    </div>,
    document.getElementById("flashCards-modal")
  );
}
