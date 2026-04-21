import React, { useContext, useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import { productCustomHook } from "../../hooks/productHook/productHook";
import { useNavigate } from "react-router-dom";
import TableRows from "./TableRows";
import Loader from "../../components/Loader";
import { ProductContextProvide } from "../../context/ProductContext";
const ListProduct = () => {
  const navigate = useNavigate();
 
  const {storeProducts}=useContext(ProductContextProvide)
  const [showPopup, setShowPoPUp] = useState(false);
  const { fetchVendorProducts, loading } = productCustomHook();

 

  if (loading) {
    return <Loader />;
  }
  return (
    <div className=" mx-auto bg-green-50">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6  py-2 sm:px-6 lg:px-8">
        {/* Left - My Products */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold">My Products</h2>
        </div>

        {/* Right - Add Product Button */}
        <div>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer"
            onClick={() => navigate("/vendor/addproduct")}
          >
            Add Product
          </button>
        </div>
      </div>
      <div className="flex flex-col overflow-x-auto  max-w-6xl w-full mx-auto ">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-7xl py-2 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm font-light w-80">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      No
                    </th>
                    <th scope="col" className="px-6 py-4">
                      image
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-4">
                      price
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Stock
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>

                {storeProducts && storeProducts.length > 0 ? (
                  storeProducts.map((item, index) => (
                    <TableRows
                      id={item._id}
                      index={index}
                      image={item.image}
                      name={item.name}
                      category={item.category}
                      price={item.price}
                      unit={item.unit}
                      stock={item.stock}
                      showPopup={showPopup} 
                      setShowPoPUp={setShowPoPUp}
                    />
                  ))
                ) : (
                  <p>No products Avilable</p>
                )}
              </table>
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
