//import React from 'react'

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loading_gif from "../../assets/loading-gif.gif";
import loadin_gif2 from "../../assets/Please_wait.gif";
import { useParams } from "react-router-dom";

export default function CreateBlog() {
  const navigate = useNavigate();
  const [loading, setIsloading] = useState(false);
  const [blogPost, setBlogPost] = useState({});
  const blog = useParams();

  const [formValues, setFormValues] = useState({
    blogTitle: "",
    blogMessage: "",
    blogImage: "",
  });

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    setIsloading(true);

    let obed = formValues;
    obed.blogMessage = obed.blogMessage.replace(
      /\*(.*?)\*/g,
      "<strong style='display:contents'>$1</strong>"
    );

    obed.blogMessage = obed.blogMessage.replace(/_p_/g, "<br>");

    //console.log(formValues);

    await axios
      .put(`http://localhost:3000/klinchem/blog/${blog.id}/update`, obed, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        // console.log(response);
        navigate("/klinchem/products_blog");
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  };

  const handleFormChange = (evt, value) => {
    setFormValues((prevState) => {
      return {
        ...prevState,
        [value]: evt.target.value,
      };
    });
  };

  const handleCancel = () => {
    navigate("/klinchem/products_blog");
  };
  const handleImageSelection = (evt) => {
    setFormValues((prevState) => {
      return {
        ...prevState,
        blogImage: evt.target.files[0],
      };
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/klinchem/blog/${blog.id}/update`)
      .then((response) => {
        console.log(response.data);

        setBlogPost(response.data);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, [blog]);

  return (
    <div className="w-full h-full flex justify-center items-center animate-flyin flex-col">
      <section className="w-[50%] ">
        <h1 className="flex justify-center items-center mb-8 text-blue-900 text-[2em]">
          Update Blog
        </h1>
        <form encType="multipart/form-data" onSubmit={handleFormSubmission}>
          {" "}
          <div className="mb-4">
            {" "}
            <div className="mb-4">
              {" "}
              <label
                htmlFor="heading"
                className="block text-gray-700 font-medium mb-2"
              >
                Heading
              </label>
              <input
                type="text"
                id="heading"
                name="heading"
                className="text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950"
                placeholder="Title here..."
                onChange={(evt) => handleFormChange(evt, "blogTitle")}
                required
                defaultValue={blogPost.blogTitle}
              />
            </div>
            <label
              htmlFor="content"
              className="block text-gray-700 font-medium mb-2"
            >
              Message
            </label>
            <textarea
              id="content"
              name="content"
              rows="6"
              className="text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950"
              placeholder="Enter your content here..."
              onChange={(evt) => handleFormChange(evt, "blogMessage")}
              required
              defaultValue={blogPost.blogMessage}
            ></textarea>{" "}
            <div className="mb-4">
              {" "}
              <label
                htmlFor="blogImage"
                className="block text-gray-700 font-medium mb-2"
              >
                Choose File
              </label>
              <input
                type="file"
                id="blogImage"
                name="blogImage"
                className="w-full text-gray-700 py-2 px-3 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-950"
                onChange={(evt) => handleImageSelection(evt)}
                required
                defaultValue={blogPost.blogImage}
              />{" "}
            </div>{" "}
          </div>{" "}
          <div className="flex flex-row">
            <button
              disabled={loading}
              type="submit"
              className="w-2/3 mr-1 flex flex-row items-center justify-center bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-opacity-50"
            >
              Update
              {loading && (
                <img
                  src={loading_gif}
                  alt="loadin-gif"
                  className="h-4 w-4 rounded ml-1"
                />
              )}
            </button>{" "}
            <button
              type="button"
              className="ml-1 w-1/3 flex flex-row items-center justify-center bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:ring-opacity-50"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
      {loading && (
        <p className="text-blue-800 flex justify-center items-center flex-col">
          <img src={loadin_gif2} alt={loadin_gif2} className="w-5 h-5 pt-1 " />
          Please Wait.....
        </p>
      )}
    </div>
  );
}
