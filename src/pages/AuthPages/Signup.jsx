import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUpInstead = () => {
    navigate("/klinchem/signIn");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    axios
      .post("http://localhost:3000/klinchem/register", formData)
      .then((response) => {
        console.log(response);
        navigate("/klinchem/signIn");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 animate-flyin">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md transform transition duration-500 hover:scale-105">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6 text-gray-900">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="userName"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              placeholder="user-name"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="userEmail"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              placeholder="eg. obed@gmail.com"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="userPassword"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              placeholder="password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-md font-medium transform transition duration-300 hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-700"
          >
            Sign Up
          </button>
          <p>
            You have an account,{" "}
            <button
              className="text-blue-600"
              type="button"
              onClick={handleSignUpInstead}
            >
              SignIn instead
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
