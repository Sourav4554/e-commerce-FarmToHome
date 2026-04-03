import React, { useContext } from "react";
import useLogin from "../hooks/authHook/useAuth";
import toast from "react-hot-toast";
import { AuthContextProvide } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();
  const {setUserInfo} = useContext(AuthContextProvide);
  const { logOut, error } = useLogin();
  //method for logout
  const handleLogout = async() => {
    const response = await logOut();
    if (!response.success) {
      toast.error(response.message);
      return
    }
    toast.success(response?.message);
    setUserInfo(null);
    navigate('/' ,{replace:true})
  };
  return (
    <>
      <button
        onClick={handleLogout}
        className="px-4 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
      >
        Logout
      </button>
    </>
  );
};

export default Logout;
