import { useNavigate } from "react-router-dom";
//import Company_Details from "../components/Company_Details"; // Import it

const Homepage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => navigate("/klinchem/signup");
  const handleSignIn = () => navigate("/klinchem/signIn");

  return (
    <div className="flex text-[1.3em] flex-col items-center justify-center p-6 overflow-visible sm:flex-col md:flex-col self-center min-h-screen w-screen">
      <header className="w-full max-w-7xl mx-auto md:h-[20vh] md:flex md:justify-center md:items-center md:flex-col bg-white shadow-md rounded-lg p-6 text-center mb-8 transition-transform duration-700 hover:scale-105">
        <h1 className="text-4xl font-bold text-blue-600 mb-4 animate-bounce">
          Welcome to Klinchem Enterprise
        </h1>
        <p className="text-gray-700 text-lg">
          Your trusted partner for top-quality laundry and cleaning products.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 text-center transform transition duration-500 hover:scale-105 mt-[3em]">
          <h2 className="text-[1.3em] font-bold text-blue-600 mb-4">
            Laundry Detergents
          </h2>
          <p className="text-gray-700">
            Explore our range of powerful and eco-friendly laundry detergents
            designed to keep your clothes fresh and clean.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center transform transition duration-500 hover:scale-105">
          <h2 className="text-[1.3em] font-bold text-blue-600 mb-4">
            Cleaning Solutions
          </h2>
          <p className="text-gray-700">
            Discover our effective and safe cleaning solutions for every corner
            of your home.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center transform transition duration-500 hover:scale-105">
          <h2 className="text-[1.3em] font-bold text-blue-600 mb-4">
            Special Offers
          </h2>
          <p className="text-gray-700">
            Check out our latest promotions and special offers on our wide range
            of products.
          </p>
        </div>
      </section>

      <section className="flex flex-row">
        <button
          onClick={handleSignUp}
          className="hover:p-2 bg-gray-900 text-gray-50 mt-4 p-1 shadow shadow-slate-700 rounded mr-2"
        >
          SignUp
        </button>
        <button
          onClick={handleSignIn}
          className="hover:p-2 bg-gray-900 text-gray-50 mt-4 p-1 shadow shadow-slate-700 rounded ml-2"
        >
          SignIn
        </button>
      </section>
    </div>
  );
};

export default Homepage;
