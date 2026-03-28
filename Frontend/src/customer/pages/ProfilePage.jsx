import React, { useContext } from "react";
import { AuthContextProvide } from "../../context/AuthContext";
import Logout from "../../components/Logout";

const ProfilePage = () => {
  const { userInfo, loading } = useContext(AuthContextProvide);
  let user = {};
  if (!loading) {
    user = { ...userInfo };
  }
 
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-green-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-green-100 p-6 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg md:text-xl font-semibold text-primary">
            My Profile
          </h1>

          <div className="flex gap-2">
            <button className="px-4 py-1.5 text-sm border border-green-300 rounded-lg text-green-700 hover:bg-green-100">
              Update Profile
            </button>

            <Logout/>
          </div>
        </div>

        {/* Profile Top */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 border-b border-green-100 pb-6 mb-6">
          {/* Avatar with ring */}
          <div className="relative">
            <img
              src="https://i.pravatar.cc/100?img=5"
              alt="profile"
              className="w-20 h-20 rounded-full object-cover border-4 border-green-200"
            />
            <span className="absolute bottom-0 right-0 bg-primary w-4 h-4 rounded-full border-2 border-white"></span>
          </div>

          {/* Info */}
          <div className="text-center md:text-left">
            <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>

            {/* Role Badge */}
            <span className="inline-block mt-1 px-3 py-0.5 text-xs bg-green-100 text-green-700 rounded-full capitalize">
              {user.role}
            </span>

            <p className="text-xs text-gray-500 mt-1">
              📍 {user.district}, {user.panchayth}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {[
            { label: "Full Name", value: user.name },
            { label: "Email", value: user.email },
            { label: "Phone", value: user.phone },
            { label: "WhatsApp", value: user.whatsapp },
            { label: "District", value: user.district },
            { label: "Panchayath", value: user.panchayth },
            { label: "Ward", value: user.ward },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-green-50 hover:bg-green-100 transition rounded-xl p-4 border border-green-100"
            >
              <p className="text-primary text-xs mb-1">{item.label}</p>
              <p className="text-gray-800 font-medium">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Bottom Decoration */}
        <div className="mt-8 text-center text-xs text-primary opacity-70">
          Fresh from Farm to Home • Supporting Local Farmers
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
