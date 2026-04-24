import React from "react";
import {  useLocation, useNavigate } from "react-router-dom";

const ProductCard = ({ id, name, price, image, unit, stock }) => {
  const navigate = useNavigate();
  const location=useLocation()
  const handleNavigation=(id)=>{
  if(location.pathname.startsWith('/products')){
    navigate(id)
   }else{
    navigate(`/products/${id}`)
   }
  }
  return (
    <div
      className="bg-white  cursor-pointer rounded-xl overflow-hidden shadow-2xl hover:shadow-lg transition duration-300"
      onClick={() => handleNavigation(id)}
    >
      {/* Image + Stock Badge */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={image}
          alt="product image..."
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />

        {/* Stock Badge */}
        <span
          className={`absolute top-2 rounded-2xl left-2 text-xs px-2 py-1 rounded-fullfont-medium ${
            stock <= 0
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {stock <= 0 ? "out of stock" : "In stock"}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h2 className="text-sm md:text-base font-semibold text-gray-800">
          {name}
        </h2>

        <p className="text-green-600 font-bold text-sm">
          ₹ {price} / {unit}
        </p>

        {/* CTA */}
        <button className="w-full mt-2 bg-green-600 text-white py-2 rounded-lg text-sm hover:bg-green-700 transition">
          Product Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
