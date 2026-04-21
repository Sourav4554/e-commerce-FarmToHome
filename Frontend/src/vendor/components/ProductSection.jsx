import React, { useContext } from "react";
import { ProductContextProvide } from "../../context/ProductContext";

const ProductSection = () => {
  const {stock,outStock,total}=useContext(ProductContextProvide)
  return (
    <>
    <div className="lg:p-5">
    <h2 className="text-xl text-center lg:text-left lg:text-3xl text-green-800 lg:ml-9">Products</h2>
    <div className=" bg-linear-to-br p-8 grid grid-cols-1 lg:grid-cols-3 gap-3 mx-auto">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 w-72 hover:shadow-md transition duration-300">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">Total Stock</p>

          <div className="bg-green-100 text-green-600 p-2 rounded-lg">📦</div>
        </div>

        <div className="mt-4">
          <h3 className="text-3xl font-semibold text-gray-800">{total || 0}</h3>
        </div>

        <div className="mt-2 flex items-center text-sm">
          <span className="text-green-600 font-medium">+12%</span>
          <span className="ml-2 text-gray-500">vs last week</span>
        </div>
      </div>
{/* dddddddddddddddddddd */}

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 w-72 hover:shadow-md transition duration-300">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">Out Of Stock</p>

          <div className="bg-green-100 text-green-600 p-2 rounded-lg">📦</div>
        </div>

        <div className="mt-4">
          <h3 className="text-3xl font-semibold text-gray-800">{outStock || 0}</h3>
        </div>

        <div className="mt-2 flex items-center text-sm">
          <span className="text-green-600 font-medium">+12%</span>
          <span className="ml-2 text-gray-500">vs last week</span>
        </div>
      </div>

   {/* dddddddddddddd */}

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 w-72 hover:shadow-md transition duration-300">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">Current Stock</p>

          <div className="bg-green-100 text-green-600 p-2 rounded-lg">📦</div>
        </div>

        <div className="mt-4">
          <h3 className="text-3xl font-semibold text-gray-800">{stock || 0}</h3>
        </div>

        <div className="mt-2 flex items-center text-sm">
          <span className="text-green-600 font-medium"></span>
          <span className="ml-2 text-gray-500"></span>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default ProductSection;
