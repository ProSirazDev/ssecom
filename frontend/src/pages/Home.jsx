import React from "react";

import DealsandOffer from "../components/DealsandOffer";
import TopCategories from "../components/TopCategories";
import Recommended from "../components/Recommended";
         import Banner from '../components/Banner'
import Brands from "../components/Brands";
import Whyus from "../components/Whyus";
import BestSellingProducts from "../components/BestSellingProducts";
import BestSellingBrands from "../components/BestSellingBrands";

const Home = () => {
  return (<>

       <Banner></Banner>
     <div className="!bg-gray-100 text-gray-800  mx-auto ">
      {/* <Menu/> */}
   
 <TopCategories />
   <Recommended />
      <DealsandOffer />

     
      
      <Brands/>
      <BestSellingProducts/>
      <BestSellingBrands/>
      <Whyus/>
   

      {/* 📢 Call to Action */}
      {/* <section className="py-16 px-6 bg-indigo-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Join 10,000+ Happy Shoppers</h2>
        <p className="mb-6">Sign up and get exclusive deals in your inbox.</p>
        <button className="bg-white text-indigo-600 font-semibold px-6 py-2 rounded hover:bg-gray-100">
          Sign Up Now
        </button>
      </section> */}
    </div>
  </>
   
  );
};

export default Home;
