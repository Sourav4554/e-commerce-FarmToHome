import React, { useEffect, useState } from "react";
import ProductDetails from "../component/ProductDetails";
import { productCustomHook } from "../../hooks/productHook/productHook";
import { useParams } from "react-router-dom";

const ProductDisplay = () => {
  const { fetchProductDescription, loading } = productCustomHook();
  const [productDetails, setProductDetails] = useState(null);
  const [vendorDetails, setVendorDetails] = useState(null);
  const { id } = useParams();
  const fetchProductData = async () => {
    const response = await fetchProductDescription(id);
    if (!response.success) {
      console.log(response.message);
      return;
    }
    setProductDetails(response.product);
    setVendorDetails(response?.product?.VendorId);
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <div className="min-h-screen bg-white p-6 flex justify-center">
      <ProductDetails
        productDetails={productDetails}
        vendorDetails={vendorDetails}
      />
    </div>
  );
};

export default ProductDisplay;
