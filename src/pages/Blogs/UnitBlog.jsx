/* eslint-disable react/prop-types */
import { Parser } from "html-to-react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../../components/Modal";
import axios from "axios";

export default function UnitBlog({ blogTitle, blogMessage, blogImage, id }) {
  const htmlParser = new Parser();
  const navigate = useNavigate();
  const [confirmDeletion, setConfirmDeletion] = useState({
    initialConfirmation: false,
  });

  const handleUpdate = () => {
    navigate(`/klinchem/blog/${id}/update`);
  };

  function handleDeletion() {
    setConfirmDeletion((prevState) => {
      return {
        ...prevState,
        initialConfirmation: true,
      };
    });
  }

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
      .delete(`http://localhost:3000/klinchem/blog/${id}/delete`)
      .then((response) => {
        handleCancelDeletion();
        navigate("/klinchem/blogSuccessSeletion");
        console.log(response);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  return (
    <div className="mt-6 flex flex-col">
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
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-[1.5rem] flex-flex-wrap mt-2 flex items-center justify-center text-blue-700  font-bold  text-center">
          {blogTitle.toUpperCase()}
        </h3>
        <div className="flex flex-col lg:flex-row justify-center items-center">
          <p>
            {" "}
            <img
              src={
                "https://res.cloudinary.com/dyepzv7v1/image/upload/" + blogImage
              }
              alt="blogImage"
              className="w-[20rem] h-[20rem] rounded-[2%]"
            />
          </p>
          <p className="flex flex-col justify-center items-center lg:w-2/3  pl-4">
            {htmlParser.parse(blogMessage)}
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center">
        <Button
          className={`bg-blue-800 text-gray-50 p-2 rounded m-1`}
          onClick={handleUpdate}
        >
          Update
        </Button>
        <Button
          className={`bg-red-600 text-gray-50 p-2 rounded m-1 mt-4 mb-4`}
          onClick={handleDeletion}
        >
          Delete
        </Button>
      </div>
      <div className="relative my-8 w-[70%]  flex justify-center items-center self-center">
        {" "}
        <span className=" flex self-center absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-0.5 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 rounded-full shadow-md"></span>{" "}
      </div>
    </div>
  );
}
