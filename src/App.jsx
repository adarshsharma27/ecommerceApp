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
import Checkout from "./components/CheckOut";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/bestsellers" element={<BestSellers />} />
        <Route path="/trending" element={<TrendingProducts />} />
        <Route path="/popular" element={<PopularProducts />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<Search />} />
        <Route path="/category/:id" element={<SubCategories />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Toaster />
      <Footer />
    </>
  );
}

export default App;
