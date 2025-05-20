/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

export default function SuccesDeletion({ message, buttonCaption, url }) {
  const navigate = useNavigate();
  const handleReturn = () => {
    navigate(url);
  };
  return (
    <section className="text-black flex justify-center items-center h-80 flex-col mt-9 animate-flyin">
      <h2 className="text-blue-600 text-[2.5em] flex justify-center items-start">
        Deletion Successful
      </h2>
      <p className="flex  items-center justify-center h-[100%] flex-col">
        {message}{" "}
        <button
          onClick={handleReturn}
          className="bg-blue-500 text-gray-50 p-1 rounded  mt-2"
        >
          {buttonCaption}
        </button>
      </p>
    </section>
  );
}
