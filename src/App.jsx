import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Cart from "./components/Cart";
import AllProducts from "./components/AllProducts";
import BestSellers from "./components/BestSellers";
import Search from "./components/Search";
import AboutUs from "./components/AboutUs";
import ProductDetails from "./components/ProductDetails";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { Toaster } from "react-hot-toast";
import TrendingProducts from "./components/TrendingProducts";
import PopularProducts from "./components/PopularProducts";
import SubCategories from "./components/SubCategories";
import DashBoard from "./components/dashBoard/DashBoard";
import CheckOutPage from "./components/CheckOutPage";
import AddProducts from "./components/AddProducts";
import UpdateProduct from "./components/UpdateProduct";
import WishListProduct from "./components/WishListProduct";
import ScrollTop from "./utlis/ScrollTop";
import UserProfile from "./components/UserProfile";
import UpdateUserProfile from "./components/UpdateUserProfile";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./ProtectedRoutes";
import { useEffect ,useState} from "react";
import { account } from "./conf/config";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const deletePreviousSession = async () => {
      await account.deleteSession("current");
    };
    deletePreviousSession();
  }, []);
  useEffect(() => {
    const mode = localStorage.getItem("mode");
    if (mode === "true") {
      let darkmode = document.querySelector("html");
      darkmode.classList.add("dark");
      setDarkMode(mode);
      localStorage.setItem("mode", mode);
    } else {
      let darkmode = document.querySelector("html");
      darkmode.classList.remove("dark");
      setDarkMode(false);
      localStorage.setItem("mode", false);
    }
  }, []);

  const addDarkMode = () => {
    let darkmode = document.querySelector("html");
    darkmode.classList.toggle("dark");
    setDarkMode(!darkMode);
    localStorage.setItem("mode", !darkMode);
  };
  const userDetails = useSelector(
    (state) => state.AuthenticationReducer.userData
  );
  return (
    <>
      <Header addDarkMode={addDarkMode} darkMode={darkMode} />
      <Routes>
        <Route element={<ProtectedRoutes isAuthenticated={userDetails} />}>
          <Route path="/cart" element={<Cart />} />

          <Route path="/category/:id" element={<SubCategories />} />
          <Route path="/checkout" element={<CheckOutPage />} />

          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/addproducts" element={<AddProducts />} />
          <Route path="/updateproduct/:id" element={<UpdateProduct />} />
          <Route path="/wishlist/:userId" element={<WishListProduct />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/update/userprofile" element={<UpdateUserProfile />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/bestsellers" element={<BestSellers />} />
        <Route path="/trending" element={<TrendingProducts />} />
        <Route path="/popular" element={<PopularProducts />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Toaster />
      <ScrollTop />
      <Footer />
    </>
  );
}

export default App;
