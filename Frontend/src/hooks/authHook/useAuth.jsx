import { useState } from "react";
import { loginUser } from "../../services/authService";
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const login = async (formdata) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await loginUser(formdata);
      if (data.success) {
        return data;
      } else {
        setError(data.message);
        throw new Error(data.message);
      }
    } catch (error) {
      const message =
        error?.response?.data?.message || "Something wromg try again later";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };
  return { login, loading, error };
};

export default useLogin;
