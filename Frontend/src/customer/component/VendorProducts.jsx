import React, { useEffect, useState } from "react";
import { productCustomHook } from "../../hooks/productHook/productHook";
import ProductSkeleton from "../../components/ProductSkelton";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";
const VendorProducts = () => {
  const [farmerProducts, setFarmerProducts] = useState([]);
  const { id } = useParams();
  const { fetchFarmerProducts, loading } = productCustomHook();

  const fetchProducts = async () => {
    if (!id) return;
    const response = await fetchFarmerProducts(id);
    if (!response.success) {
      console.log(response.message);
      return;
    }
    setFarmerProducts(response.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log(`farmer products`,farmerProducts);
  }, [farmerProducts]);
  return (
    <div className="mb-12 lg:mb-16">
      <div className="flex items-center justify-between mb-6 lg:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          My Products
        </h2>
        <span className="text-emerald-600 font-semibold text-sm sm:text-base">
          {farmerProducts.length || 0} items available
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : farmerProducts.length > 0 ? (
          farmerProducts.map((item) => (
            <ProductCard
              key={item.key}
              name={item.name}
              price={item.price}
              image={item.image}
              unit={item.unit}
              id={item._id}
              stock={item.stock}
            />
          ))
        ) : (
          <h1 className="text-gray-500">NO PRODUCTS AVAILABLE</h1>
        )}
      </div>
    </div>
  );
};

export default VendorProducts;
