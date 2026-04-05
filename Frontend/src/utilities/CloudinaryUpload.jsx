import axios from "axios";
 const cloudinaryUpload = async (file,signedUrlFun) => {
  try {
    const cloudinaryData = new FormData();
    if (file) {
      const response = await signedUrlFun();
      if (!response.success) {
        console.log(response.message);
        return;
      }
      cloudinaryData.append("file", file),
        cloudinaryData.append("api_key", response.apikey);
      cloudinaryData.append("timestamp", response.timestamp);
      cloudinaryData.append("signature", response.signature);
      cloudinaryData.append("folder", response.folder);
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${response.cloudName}/image/upload`,
        cloudinaryData
      );
      if (data.secure_url) {
        return data.secure_url || null;
      }
    }
  } catch (error) {
    console.log(error);
    return null
  }
};

export default cloudinaryUpload