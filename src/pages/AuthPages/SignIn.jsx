import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    userName: "",
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
    navigate("/klinchem/signup");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    axios
      .post("http://localhost:3000/klinchem/login", {
        username: formData.userName, // Adjust key to match what the server expects
        password: formData.userPassword,
      })
      .then((response) => {
        navigate(response.data.currentPage);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen flex text-[1.3em] items-center justify-center bg-transparent  w-[100%] animate-flyin">
      <div className="bg-white p-8  rounded-lg shadow-md w-full max-w-md md:w-1/2 transform transition duration-500 hover:scale-105">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Sign In
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6 text-gray-900">
          <div>
            <label className="block mb-2 text-[1.2em] font-medium text-gray-700">
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
            <label className="block mb-2 text-[1.2em] font-medium text-gray-700">
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
            Sign In
          </button>
          <p>
            Don&apos;t an account,{" "}
            <button
              className="text-blue-600"
              type="button"
              onClick={handleSignUpInstead}
            >
              SignUp instead
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
