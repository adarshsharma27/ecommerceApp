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
import LogIn from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/bestsellers" element={<BestSellers />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
