import React, { createContext, useEffect, useState } from "react";
import api from "../api/axios";
export const AuthContextProvide = createContext(null);

const AuthContext = ({ children }) => {
  //state variable used for store user information
  const [userInfo, setUserInfo] = useState(null);
  const [loading,setLoading]=useState(true)
    const fetchUserInfo = async () => {
      try {
        const { data } = await api.get("/user/me");
        if (data.success) {
          setUserInfo(data.data);
        }
      } catch (error) {
        console.log(error?.response?.data?.message);
      }finally{
      setLoading(false)
      }
    };
    useEffect(() => {
    fetchUserInfo();
  }, []);

  const contextData = {
    userInfo,
    loading,
    setUserInfo,
    fetchUserInfo
  };
  return (
    <AuthContextProvide.Provider value={contextData}>
      {children}
    </AuthContextProvide.Provider>
  );
};

export default AuthContext;
