import { Suspense, lazy } from "react";
import { useEffect } from "react";
import React from "react";

const CreateProducts = lazy(() => import("./pages/Products/CreateProducts"));
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
const Company_Details = lazy(() => import("./components/Company_Details"));
const Products = lazy(() => import("./pages/Products/Products"));
const Blog = lazy(() => import("./pages/Blogs/Blog"));
const Reviews = lazy(() => import("./pages/Reviews/Reviews"));
import { useState } from "react";
const Details = lazy(() => import("./pages/Products/Details"));
const EditProduct = lazy(() => import("./pages/Products/EditProduct"));
const CreateBlog = lazy(() => import("./pages/Blogs/CreateBlog"));
const UpdateBlog = lazy(() => import("./pages/Blogs/UpdateBlog"));
const SuccesDeletion = lazy(() => import("./components/SuccesDeletion"));
const CreateReviews = lazy(() => import("./pages/Reviews/CreateReviews"));
const UpdateReview = lazy(() => import("./pages/Reviews/UpdateReview"));
const Signup = lazy(() => import("./pages/AuthPages/Signup"));
const Homepage = lazy(() => import("./pages/Hompage"));
const SignIn = lazy(() => import("./pages/AuthPages/SignIn"));
const ProductReviews = lazy(() => import("./pages/Products/ProductReviews"));
const CheckOutPage = lazy(() => import("./pages/CheckOutPage"));

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [modalStatus, setModalState] = useState(false);
  const [showProduct, setShowProduct] = useState();
  const [flashCardStatus, setFlashCardStatus] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/auth-status", { credentials: "include" }) // Check session when app loads
      .then((res) => res.json())
      .then((data) => setIsLoggedIn(data.isAuthenticated))
      .catch((err) => console.error("Error checking auth:", err));
  }, []);

  const getCartItems = (items) => {
    setCartItems((prevState) => {
      return [...prevState, items];
    });
  };

  const handleModalState = (status) => {
    setModalState(status);
  };

  const handleModalState2 = (status) => {
    setModalState(status);
  };

  const getDetails = (a) => {
    setShowProduct(() => {
      return a;
    });
  };

  const takeCardStatus = (status) => {
    setFlashCardStatus(status);
  };

  console.log(import.meta.env.VITE_MODE);
  console.log(React.version);
  // Should print "production"

  const handleCartData = (val) => {
    setCartItems(val);
  };
  const nullifyFlashCardStataus = (st) => [setFlashCardStatus(st)];

  return (
    <div className=" relative flex flex-col font-Montserrat text-gray-50 z-10 bg-[url('./images/background.avif')] bg-cover bg-no-repeat w-full min-h-screen justify-start items-center">
      <Company_Details />
      {isLoggedIn && (
        <NavBar cartItems={cartItems} handleModalState={handleModalState} />
      )}
      <Suspense
        fallback={
          <div className="text-center text-lg">Loading... Please wait</div>
        }
      >
        <Routes>
          <Route path="/klinchem/signup" element={<Signup />} />
          <Route path="/klinchem/signIn" element={<SignIn />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/klinchem/checkout" element={<CheckOutPage />} />
          <Route
            path="/products/new"
            element={<CreateProducts takeCardStatus={takeCardStatus} />}
          />
          <Route
            path="/products"
            element={
              <Products
                getCartItems={getCartItems}
                cartItems={cartItems}
                handleModalState={handleModalState}
                modalStatus={modalStatus}
                handleModalState2={handleModalState2}
                sendDetails={getDetails}
                flashCardStatus={flashCardStatus}
                nullifyFlashCardStataus={nullifyFlashCardStataus}
                showProduct={showProduct}
                handleCartData={handleCartData}
              />
            }
          />
          <Route path="/klinchem/products_blog" element={<Blog />} />
          <Route
            path="/klinchem/product_reviews/:id/Review"
            element={<ProductReviews />}
          />
          <Route path="/klinchem/products_blog/new" element={<CreateBlog />} />
          <Route path="/klinchem/blog/:id/update" element={<UpdateBlog />} />
          <Route
            path="/klinchem/blogSuccessSeletion"
            element={
              <SuccesDeletion
                message={"Blog Succesfully Deleted. Navigate back"}
                buttonCaption={"View Blog"}
                url={"/klinchem/products_blog"}
              />
            }
          />
          <Route path="/klinchem/products_reviews" element={<Reviews />} />
          <Route
            path={`/klinchem/:id/products_Details`}
            element={<Details />}
          />
          <Route path={`/klinchem/:id/editProduct`} element={<EditProduct />} />
          <Route
            path={`/klinchem/ProductReviews/new`}
            element={<CreateReviews />}
          />
          <Route
            path={`/klinchem/ProductReviews/:id/update`}
            element={<UpdateReview />}
          />
          <Route path="/klinchem/home" element={<Homepage />} />

          <Route
            path="/klinchem/products_reviews/success"
            element={
              <SuccesDeletion
                message={"Review successflly detleted. Navigate back."}
                buttonCaption={"View Review"}
                url={"/klinchem/products_reviews"}
              />
            }
          />
        </Routes>
        <footer className="fixed bottom-0 text-[8px]  bg-gray-900 rounded w-[95%] text-white p-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} Klinchem Enterprise. All rights
            reserved.
          </p>
        </footer>
      </Suspense>
    </div>
  );
}

export default App;
