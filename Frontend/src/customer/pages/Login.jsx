import React, { useContext, useEffect, useState } from "react";
import useLogin from "../../hooks/authHook/useAuth";
import toast from "react-hot-toast";
import LoaderButton from "../../components/LoaderButton";
import { AuthContextProvide } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { setUserInfo, userInfo, fetchUserInfo } =
    useContext(AuthContextProvide);
  const { login, register, loading, error } = useLogin();
  const [loginHandle, setLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    whatsapp: "",
    district: "",
    panchayth: "",
    ward: "",
    role: "",
  });
  const navigate = useNavigate();
  //handling navigation
  useEffect(() => {
    if (userInfo) {
      switch (userInfo.role) {
        case "customer":
          navigate("/");
          break;
        case "admin":
          navigate("/admin");
          break;
        case "vendor":
          navigate("/vendor");
          break;
        default:
          navigate("/register");
          break;
      }
    }
  }, [userInfo]);

  //method for handling registration ui
  const handleRegistrationUi = () => {
    setLogin(!loginHandle);
  };
  //collect inputs from form
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //method for handling form submition
  const submitHandler = async (e) => {
    e.preventDefault();
    //user login method
    if (loginHandle) {
      const response = await login({
        email: formData.email,
        password: formData.password,
      });
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
      setUserInfo(response.data);
      fetchUserInfo();
    } else {
      //user registration method
      const response = await register(formData);
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
    }
  };

  //method for handling google Authentication
  const handleGoogleAuth=()=>{
  window.location.href=`http://localhost:3000/api/v1/auth/google`
  }
  return (
    <section className="flex flex-col md:flex-row p-2 mx-auto w-full max-w-5xl min-h-1/2 h-auto shadow">
      <div className="w-full md:w-5/12 bg-linear-to-br from-green-100 to-green-300 flex items-center justify-center p-6">
        <div className="flex flex-col gap-6 text-center backdrop-blur-lg p-8  ">
          <h2 className="font-bold text-3xl md:text-4xl text-green-700">
            Welcome Back
          </h2>

          <p className="text-sm text-green-800">
            Welcome back to Farm2Home, fresh goodness awaits you 🌿
          </p>

          <button
            onClick={handleRegistrationUi}
            className="py-2 px-8 mx-auto rounded-full bg-green-600 text-white font-semibold 
      hover:bg-green-700 hover:shadow-lg hover:scale-105 
      transition duration-300"
          >
            {!loginHandle ? "sign in" : "create Account"}
          </button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-2">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-white  rounded-2xl  space-y-4"
        >
          <h1 className="text-green-600 text-2xl md:text-3xl font-bold text-center">
            Create Account
          </h1>
          {/*continue with google */}

          {/* Google Icon */}
          <button className=" mx-auto block p-2 rouded-full shadow cursor-pointer duration-200 transition-all hover:scale-105"
          onClick={handleGoogleAuth}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-6 h-6 "
            />
          </button>

          {/* Name */}
          {!loginHandle && (
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={inputHandler}
              placeholder="Your Name"
              className="w-full border border-green-400 rounded-lg px-4 py-3 outline-none text-gray-600 focus:ring-2 focus:ring-green-300"
            />
          )}

          {/* Email */}

          {/* Email */}
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={inputHandler}
            placeholder="example@gmail.com"
            className="w-full border border-green-400 rounded-lg px-4 py-3 outline-none text-gray-600 focus:ring-2 focus:ring-green-300"
          />
          {/* Password */}
          <input
            required
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={inputHandler}
            className="w-full border border-green-400 rounded-lg px-4 py-3 outline-none text-gray-600 focus:ring-2 focus:ring-green-300"
          />
          {/* Phone + WhatsApp */}

          {!loginHandle && (
            <>
              <div className="flex gap-3">
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={inputHandler}
                  placeholder="Phone Number"
                  className="w-full border border-green-400 rounded-lg px-4 py-3 text-gray-600 outline-none focus:ring-2 focus:ring-green-300"
                />
                <input
                  required
                  type="tel"
                  placeholder="WhatsApp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={inputHandler}
                  className="w-full border border-green-400 rounded-lg px-4 py-3 text-gray-600 outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>
              {/* District */}
              <input
                required
                type="text"
                placeholder="District"
                name="district"
                value={formData.district}
                onChange={inputHandler}
                className="w-full border border-green-400 rounded-lg px-4 text-gray-600 py-3 outline-none focus:ring-2 focus:ring-green-300"
              />
              {/* Panchayat + Ward */}
              <div className="flex gap-3">
                <input
                  required
                  type="text"
                  placeholder="Panchayth"
                  name="panchayth"
                  value={formData.panchayth}
                  onChange={inputHandler}
                  className="w-full border border-green-400 text-gray-600 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-300"
                />
                <input
                  required
                  type="text"
                  placeholder="Ward"
                  name="ward"
                  value={formData.ward}
                  onChange={inputHandler}
                  className="w-full border border-green-400 text-gray-600 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>
              {/* Role Selection */}
              <div className="flex justify-center gap-6 font-medium">
                <label className="flex items-center gap-2 text-gray-600  cursor-pointer">
                  <input
                    required
                    type="radio"
                    name="role"
                    value="customer"
                    onChange={inputHandler}
                  />
                  customer
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    required
                    type="radio"
                    name="role"
                    value="vendor"
                    onChange={inputHandler}
                    className="text-gray-600"
                  />
                  vendor
                </label>
              </div>
            </>
          )}

          {/* Submit Button */}
          {!loading ? (
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
            >
              {!loginHandle ? "Create Account" : "Sign in"}
            </button>
          ) : (
            <LoaderButton />
          )}
          {loginHandle && (
            <p className="flex gap-3">
              <span>Do you forgotten Password:</span>
              <span className="text-green-600 underline cursor-pointer">
                Reset Password
              </span>
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Login;
