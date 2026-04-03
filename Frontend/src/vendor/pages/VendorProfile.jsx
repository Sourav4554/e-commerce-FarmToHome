import React, { useContext } from "react";
import { AuthContextProvide } from "../../context/AuthContext";
import Loader from "../../components/Loader";
import ProfileComponent from "../../components/ProfileComponent";

const VendorProfile = () => {
    const { userInfo, loading } = useContext(AuthContextProvide);
    if (loading) {
      return <Loader />; 
    }
    return (
      <>
      <ProfileComponent userInfo={userInfo}/>
      </>
    );
}

export default VendorProfile