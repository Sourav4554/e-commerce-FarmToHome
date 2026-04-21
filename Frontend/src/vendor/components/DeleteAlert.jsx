import React, { useContext } from "react";
import { productCustomHook } from "../../hooks/productHook/productHook";
import toast from "react-hot-toast";
import { ProductContextProvide } from "../../context/ProductContext";

const DeleteAlert = ({ showPopup, setShowPoPUp,id }) => {
    const {deleteSellerProduct,loading}=productCustomHook()
    const {storeProducts,setStoreProducts,productCount}=useContext(ProductContextProvide)
  const handlePopup = () => {
    setShowPoPUp(!showPopup);
  };

  //function for delete seller 
const deleteProduct=async(id)=>{
const response=await deleteSellerProduct(id)
if(!response.success){
  toast.error(response.message)
  return
}
setShowPoPUp(!showPopup)
setStoreProducts((prev)=>prev.filter((item)=>item._id!==id))
await productCount()
toast.success(response.message)
}
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      {/* Modal Box */}
      <div className="relative bg-white rounded-2xl  w-[90%] max-w-md p-6 sm:p-8">
        {/* Close Icon */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={handlePopup}
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-center text-lg sm:text-xl font-semibold text-gray-800">
          Are you sure you want to <br /> Remove this Product?
        </h2>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 mt-6">
          {/* Delete Button */}
          <button className="px-6 py-2 rounded-lg text-white font-medium bg-linear-to-r from-orange-500 to-red-500 shadow-md hover:opacity-90 transition"
          onClick={()=>deleteProduct(id)}
          >
           {loading?'Deleting...':'Delete'}
          </button>

          {/* Cancel Button */}
          <button className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
           onClick={handlePopup}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAlert;
