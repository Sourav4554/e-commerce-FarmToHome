import { useState } from "react";
import {
  loginUser,
  registration,
  userLogOut,
  profileCompletion
} from "../../services/authService";
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //custom hook for login
  const login = async (formdata) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await loginUser(formdata);
      if (!data.success) {
        setError(data.message);
        return { success: data.success, message: data.message };
      }
      return data;
    } catch (err) {
      const message =
        err?.response?.data?.message || "Something went wrong,try again later";

      setError(message);
      return { success: false, message: message };
    } finally {
      setLoading(false);
    }
  };

  //custom hook for user registration
  const register = async (formdata) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await registration(formdata);
      if (!data.success) {
        setError(data.message);
        return { success: data.success, message: data.message };
      }
      return data;
    } catch (err) {
      const message =
        err?.response?.data?.message || "Something wromg try again later";
      setError(message);
      return { success: false, message: message };
    } finally {
      setLoading(false);
    }
  };

  //custom hook for user Logout
  const logOut = async () => {
    try {
      setError(null);
      setLoading(error);
      const { data } = await userLogOut();
      return { success: data.success, message: data.message };
    } catch (err) {
      
      const message =
        err?.response?.data?.message || "Something wromg try again later";
      setError(message);
      return { success: false, message: message };
    } finally {
      setLoading(false);
    }
  };

  //custom hook for handling profile completion
  const completeProfile = async (formData) => {
    try {
      setError(null);
      setLoading(true);
      const { data } = await profileCompletion(formData);
      console.log(data)
      return {
        success: data.success,
        message: data.message,
        profile: data.data,
      };
    } catch (err) {
      console.log(err)
      const message =
        err?.response?.data?.message || "Something wromg try again later";
      setError(message);
      return { success: false, message: message };
    } finally {
      setLoading(false);
    }
  };
  return { login, register, logOut, completeProfile, loading, error };
};

export default useLogin;
