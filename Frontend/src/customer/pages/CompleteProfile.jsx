import React, { useContext, useEffect } from "react";
import { AuthContextProvide } from "../../context/AuthContext";
import { useState } from "react";
import Loader from "../../components/Loader";
import useLogin from "../../hooks/authHook/useAuth";
import LoaderButton from "../../components/LoaderButton";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
const CompleteProfile = () => {
  const { userInfo, loading ,setUserInfo} = useContext(AuthContextProvide);
  const { completeProfile } = useLogin();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    district: "",
    panchayth: "",
    ward: "",
    role: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: userInfo?.name,
    }));
  }, [userInfo]);

  //method for handling inputs from form
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //method for handling form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await completeProfile(formData);
    if (!response.success) {
      toast.error(response?.message);
      return;
    }
    if (response?.profile?.role?.includes("customer") && response.success) {
      setUserInfo(response.profile)

      navigate("/");
      return;
    } else if (response?.profile?.role?.includes("vendor") && response.success) {
      setUserInfo(response.profile)
      navigate('/vendor',{replace:true})
    }
  };
  return (
    <>
      {loading && <Loader />}
      <section className="flex flex-col md:flex-row p-2 mx-auto w-full max-w-5xl min-h-1/2 h-auto shadow">
        <div className="w-full md:w-5/12 bg-linear-to-br from-green-100 to-green-300 flex items-center justify-center p-6">
          <div className="flex flex-col gap-6 text-center backdrop-blur-lg p-8  ">
            <h2 className="font-bold text-2xl md:text-3xl text-green-700">
              Complete this form
            </h2>

            <p className="text-sm text-green-800">
              Welcome back to Farm2Home, fresh goodness awaits you 🌿
            </p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-2">
          <form
            onSubmit={submitHandler}
            className="w-full max-w-md bg-white  rounded-2xl  space-y-4"
          >
            <h1 className="text-green-600 text-2xl md:text-3xl font-bold text-center">
              Complete Profile
            </h1>
            {/*continue with google */}

            {/* Name */}

            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={inputHandler}
              placeholder="Your Name"
              className="w-full border border-green-400 rounded-lg px-4 py-3 outline-none text-gray-600 focus:ring-2 focus:ring-green-300"
            />

            {/* Password */}

            {/* Phone + WhatsApp */}

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

            {/* Submit Button */}
            {!loading ? (
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
              >
                Profile Completed
              </button>
            ) : (
              <LoaderButton />
            )}
          </form>
        </div>
      </section>
    </>
  );
};

export default CompleteProfile;
