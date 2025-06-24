import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Notfound from "./pages/Notfound";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/Productdetails";
import BecomeSeller from "./pages/BecomeSeller";
import Payment from "./pages/Payment";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerSignup from "./pages/CustomerSignup";
import Address from "./pages/Address";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import MobileSignin from "./pages/MobileSignin";
import OtpVerify from "./pages/OtpVerify";
import EditProfile from "./pages/EditProfile";
import Logout from "./pages/Logout";
import Faqs from "./pages/Faqs";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ReturnPolicy from "./pages/ReturnPolicy";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";
import MyProfile from "./pages/MyProfile";
import DeliveryAddress from "./pages/DeliveryAddress";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
         <ScrollToTop />
      <Routes>
        {/* All pages under MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Products />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<CustomerSignup />} />
          <Route path="signin" element={<MobileSignin />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="otp-verify" element={<OtpVerify />} />
          <Route path="sign-out" element={<Logout />} />
          <Route path="cart" element={<Cart />} />
          <Route
            path="productdetails/:productId"
            element={<ProductDetails />}
          />
          <Route path="becomeseller" element={<BecomeSeller />} />
          <Route path="payments" element={<Payment />} />
          
          
          <Route path="profile" element={<Profile />} />
          <Route path="terms" element={<TermsConditions />} />
          <Route path="faq" element={<Faqs />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="returns" element={<ReturnPolicy />} />
          <Route path="checkout" element={<Checkout />} />
            <Route path="delivery-address" element={<DeliveryAddress />} />
          <Route path="address/:usid" element={<Address/>} />
          <Route path="thankyou" element={<ThankYou />} />
            <Route path="my-profile" element={<MyProfile />} >
            </Route>
            <Route path="orders" element={<Orders />} />

          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
