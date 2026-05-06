import React, { useContext, useState } from "react";
import useLogin from "../hooks/authHook/useAuth";
import toast from "react-hot-toast";
import { AuthContextProvide } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();
  const [loader,setLoader]=useState(false)
  const {setUserInfo} = useContext(AuthContextProvide);
  const { logOut, error } = useLogin();
  //method for logout
  const handleLogout = async() => {
    setLoader(true)
    const response = await logOut();
    if (!response.success) {
      toast.error(response.message);
      setLoader(false)
      return
    }
    setLoader(false)
    toast.success(response?.message);
    setUserInfo(null);
    navigate('/' ,{replace:true})
  };
  return (
    <>
      <button
        onClick={handleLogout}
        className="px-4 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
        disabled={loader}
      >
        {loader?'Logout...':'Logout'}
      </button>
    </>
  );
};

export default Logout;
