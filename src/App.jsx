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
import DashBoard from "./components/DashBoard";
import CheckOutPage from "./components/CheckOutPage";
import AddProducts from "./components/AddProducts";
import UpdateProduct from "./components/UpdateProduct";
import WishListProduct from "./components/WishListProduct";
import ScrollTop from "./utlis/ScrollTop";
import UserProfile from "./components/UserProfile";
import UpdateUserProfile from "./components/UpdateUserProfile";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
  const userDetails = useSelector(
    (state) => state.AuthenticationReducer.userData
  );
  return (
    <>
      <Header />
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
