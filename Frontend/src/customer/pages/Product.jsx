import React, { useEffect, useState } from "react";
import ProductsHero from "../component/ProductsHero";
import ProductCard from "../component/ProductCard";
import { productCustomHook } from "../../hooks/productHook/productHook";
import Pagination from "../../components/Pagination";
import ProductSkeleton from "../../components/ProductSkelton";
const Product = () => {
  const { fetchPaginatedProducts, loading } = productCustomHook();
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  //method for fetch paginated farmers
  const fetchPaginatedVegitables = async (page) => {
    const response = await fetchPaginatedProducts(page);
    console.log(`data inside products`, response);
    if (!response.success) {
      console.log(response.message);
      return;
    }
    setTotalPages(response.totalPages);
    setPage(response.pages);
    setProducts(response.products);
  };

  useEffect(() => {
    fetchPaginatedVegitables(page);
  }, [page]);
  return (
    <div className="min-h-screen bg-green-50 p-4 md:p-8">
      {/* Header */}
      <ProductsHero />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-4 py-6 bg-gray-50">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : products.length > 0 ? (
          products.map((item) => (
            <ProductCard
              key={item.key}
              name={item.name}
              price={item.price}
              image={item.image}
              unit={item.unit}
              id={item._id}
            />
          ))
        ) : (
          <h1 className="text-gray-500">NO PRODUCTS AVAILABLE</h1>
        )}
      </div>
     {
     products.length>0&& 
     <Pagination
     page={page}
     setPage={setPage}
     totalPages={totalPages}
     loading={loading}
   />
     }
    </div>
  );
};

export default Product;
