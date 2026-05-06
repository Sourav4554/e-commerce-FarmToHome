import { useContext, useState } from "react";
import { AuthContextProvide } from "../context/AuthContext";
import noProfileLogo from "../asscets/Starter pfp.jpeg";
import cloudinaryUpload from "../utilities/CloudinaryUpload";
import { useNavigate } from "react-router-dom";
import { validateImage } from "../utilities/ValidateImage";
import toast from "react-hot-toast";
import { productCustomHook } from "../hooks/productHook/productHook";
import useLogin from "../hooks/authHook/useAuth";
export default function UpdateProfile() {
  const { userInfo ,setUserInfo} = useContext(AuthContextProvide);
  const { signedUrlFun ,loading} = productCustomHook();
  const {updateUserProfile,}=useLogin()
  const navigate = useNavigate();
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [preview, setPreview] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    phone: userInfo?.phone || "",
    whatsapp: userInfo?.whatsapp || "",
    district: userInfo?.district || "",
    panchayth: userInfo?.panchayth || "",
    ward: userInfo?.ward || "",
    avatar: userInfo?.avatar || "",
 
  });

  // Handle input change
  const handleData = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image preview
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarSrc(file);
    const preview = URL.createObjectURL(file);
    setPreview(preview);
  };

  // Handle submit (for now console)
  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = updatedData?.avatar;
    if (avatarSrc) {
      const validate = await validateImage(avatarSrc);
      if (!validate.success) {
        toast.error(validate.message);
        return;
      }

      //cloudinary upload function evoke
      const cloudinaryRes = await cloudinaryUpload(
        validate.image,
        signedUrlFun
      );
      if (cloudinaryRes) {
        imageUrl = cloudinaryRes;
      }
    }
      const newData = {
        ...updatedData,
        avatar: imageUrl,
      };
      console.log(newData)
      const response = await updateUserProfile(newData)
      if(!response.success){
      toast.error(response.message)
      return
      }
      setUserInfo(response.user)
      toast.success(response.message)
      if(response.user?.role==='customer'){
        navigate('/profile')
      }else{
        navigate('/vendor/profile')
      }
      
    
  };

  return (
    <div className="font-sans max-w-4xl mx-auto py-6">
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-5 px-8 py-6 border-b border-gray-100">
          {/* Avatar */}
          <div className="relative shrink-0">
            <img
              src={preview || userInfo?.avatar || noProfileLogo}
              alt="profile"
              className="w-18 h-18 rounded-full object-cover border-[3px] border-white outline outline-green-600"
            />
            <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
          </div>

          {/* Info */}
          <div className="flex-1">
            <span className="inline-block bg-green-50 text-green-800 text-[11px] px-2.5 py-0.5 rounded-full">
              Customer
            </span>
            <p className="text-[17px] font-medium mt-1">
              {userInfo && userInfo?.name}
            </p>
            <p className="text-[13px] text-gray-400 mt-0.5">
              {userInfo && userInfo.district}
            </p>
          </div>

          {/* Upload */}
          <label className="cursor-pointer bg-green-600 text-white rounded-lg px-3.5 py-2 text-[13px]">
            Change photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </label>
        </div>

        {/* Body */}
        <div className="px-8 py-7">
          {/* Personal Details */}
          <p className="text-[11px] font-medium uppercase mb-4">
            Personal details
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {/* Name */}
            <div className="bg-gray-50 border rounded-lg px-3.5 py-2.5">
              <label className="text-[11px]">Full name</label>
              <input
                type="text"
                name="name"
                value={updatedData.name}
                onChange={handleData}
                placeholder="Enter full name"
                className="w-full bg-transparent outline-none"
                required
              />
            </div>

            {/* Email */}
            <div className="bg-gray-50 border rounded-lg px-3.5 py-2.5">
              <label className="text-[11px]">Email</label>
              <input
                type="email"
                name="email"
                value={updatedData.email}
                onChange={handleData}
                placeholder="Enter email"
                className="w-full bg-transparent outline-none"
                required
              />
            </div>

            {/* Phone */}
            <div className="bg-gray-50 border rounded-lg px-3.5 py-2.5">
              <label className="text-[11px]">Phone</label>
              <input
                type="tel"
                name="phone"
                value={updatedData.phone}
                onChange={handleData}
                placeholder="+91 00000 00000"
                className="w-full bg-transparent outline-none"
                required
              />
            </div>

            {/* WhatsApp */}
            <div className="bg-gray-50 border rounded-lg px-3.5 py-2.5">
              <label className="text-[11px]">WhatsApp</label>
              <input
                type="tel"
                name="whatsapp"
                value={updatedData.whatsapp}
                onChange={handleData}
                placeholder="+91 00000 00000"
                className="w-full bg-transparent outline-none"
                required
              />
            </div>
          </div>

          <hr className="mb-6" />

          {/* Location */}
          <p className="text-[11px] font-medium uppercase mb-4">Location</p>

          <div className="grid grid-cols-2 gap-3 mb-3">
            {/* District */}
            <div className="bg-gray-50 border rounded-lg px-3.5 py-2.5">
              <label className="text-[11px]">District</label>
              <input
                type="text"
                name="district"
                value={updatedData.district}
                onChange={handleData}
                placeholder="Enter district"
                className="w-full bg-transparent outline-none"
                required
              />
            </div>

            {/* Panchayath */}
            <div className="bg-gray-50 border rounded-lg px-3.5 py-2.5">
              <label className="text-[11px]">Panchayath</label>
              <input
                type="text"
                name="panchayath"
                value={updatedData.panchayth}
                onChange={handleData}
                placeholder="Enter panchayath"
                className="w-full bg-transparent outline-none"
                required
              />
            </div>
          </div>

          {/* Ward */}
          <div className="bg-gray-50 border rounded-lg px-3.5 py-2.5">
            <label className="text-[11px]">Ward</label>
            <input
              type="text"
              name="ward"
              value={updatedData.ward}
              onChange={handleData}
              placeholder="Enter ward number"
              className="w-full bg-transparent outline-none"
              required
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between px-8 py-5 border-t">
          <span className="text-[13px] text-gray-300">
            All fields are optional
          </span>

          <div className="flex gap-2.5">
            <button
              className="bg-red-600 text-white px-5 py-2 rounded-lg cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="bg-green-800 text-white px-6 py-2 rounded-lg  cursor-pointer"
            >
             {loading?' Saving...':'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
