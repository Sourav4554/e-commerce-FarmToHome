import { useState } from "react";
import { loginUser, registration } from "../../services/authService";
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
      console.log('error from interceptor',err)
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
  return { login, register, loading, error };
};

export default useLogin;
