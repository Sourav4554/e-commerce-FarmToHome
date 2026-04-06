
import { fetchSignedUrl, paginatedProducts, submitProduct } from "../../services/productService";
import { useState } from "react";

//custom hook for handling product for vendor
export const productCustomHook = () => {
  const [loading, setLoading] = useState(false);
  //method for signed url
  const signedUrlFun = async () => {
    try {
      setLoading(true)
      const { data } = await fetchSignedUrl();
      return {
        success: data.success,
        timestamp: data.timestamp,
        signature: data.signature,
        apikey: data.apikey,
        cloudName: data.cloudName,
        folder: data.folder,
      };
    } catch (err) {
      console.log(err);
      const message =
        err?.response?.data?.message || "Something wromg try again later";
      return { success: false, message: message };
    } finally {
      setLoading(true);
    }
  };
  //method for add product to database
  const saveProduct=async(formdata)=>{
   try {
    setLoading(true)
    const {data}=await submitProduct(formdata)
    return {
      success:data.success,
      message:data.message
     }
   } catch (err) {
    console.log(err);
    const message =
      err?.response?.data?.message || "Something wromg try again later";
    return { success: false, message: message };
   }finally{
    setLoading(false)
  }
  }

  //method for fetch paginated products for customer
  const fetchPaginatedProducts=async(page)=>{
  try {
    setLoading(true)
    const {data}=await paginatedProducts(page)
    return {
    success:data.success,
    totalPages:data.totalPages,
    pages:data.pages,
    products:data.products
    }
  } catch (err) {
    console.log(err.response.data);
    const message =
      err?.response?.data?.message || "Something wromg try again later";
    return { success: false, message: message };
  }
  finally{
    setLoading(false)
  }
}
  return { loading, signedUrlFun,saveProduct,fetchPaginatedProducts};
};
