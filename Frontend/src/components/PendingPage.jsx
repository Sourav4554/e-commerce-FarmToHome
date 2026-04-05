import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import useLogin from "../hooks/authHook/useAuth";
import { AuthContextProvide } from "../context/AuthContext";
const PendingPage = () => {
    const navigate=useNavigate()
    const{setUserInfo}=useContext(AuthContextProvide)
    const {logOut}=useLogin();
    //function for handling LogOut
    const handleLogOut=async()=>{
    const response=await logOut()
    if(response.success){
    navigate('/',{replace:true})
    setUserInfo(null)
    return
    }
    console.log(response.message)
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
     
      <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-8 text-center ">
         <p className="bg-green-50 w-fit flex items-center cursor-pointer p-2 text-green-800 animate-pulse"
         onClick={handleLogOut}
         >
        <FiArrowLeft/>Back
         </p>
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full animate-spin">
            <svg
              className="w-10 h-10 text-green-500 "
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l2 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Account Under Review
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-sm mb-6">
          Your vendor account is currently being reviewed by our  team.
          This usually takes a short time. Please check back later.
        </p>
        <p className="text-gray-600 text-sm mb-6">Our team will contact you after approval.</p>
        {/* Status Badge */}
        <div className="mb-6">
          <span className="bg-green-100 text-green-700 text-xs font-medium px-4 py-1 rounded-full">
            Pending Approval
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-6"></div>

        {/* Footer Note */}
        <p className="text-xs text-gray-400">
          Need help? Contact support for more information.
        </p>
      </div>
    </div>
  );
};

export default PendingPage;
