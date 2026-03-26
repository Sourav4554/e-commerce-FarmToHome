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
        return null;
      }
      return data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Something went wrong,try again later";
      setError(message);
      return null;
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
        return null;
      }
      return data;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Something wromg try again later";
      console.log(message);
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };
  return { login, register, loading, error };
};

export default useLogin;
