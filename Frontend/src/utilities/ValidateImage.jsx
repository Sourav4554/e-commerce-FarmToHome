import imageCompression from "browser-image-compression";

const MAX_SIZE = 2 * 1024 * 1024;

export const validateImage = async (file) => {
  try {
    if (!file.type.startsWith("image")) {
      return { success: false, message: "Please upload an image file" };
    }

    if (file.size > MAX_SIZE) {
      return { success: false, message: "Below 2MB images are allowed" };
    }

    let options = {
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    let compressedImage = file;

    const sizeKB = file.size / 1024;

    if (sizeKB >= 100 && sizeKB <= 200) {
      options = { ...options, maxSizeMB: 0.15, initialQuality: 0.8 };
      compressedImage = await imageCompression(file, options);
    } else if (sizeKB > 200 && sizeKB <= 500) {
      options = { ...options, maxSizeMB: 0.3, initialQuality: 0.7 };
      compressedImage = await imageCompression(file, options);
    } else if (sizeKB > 500 && sizeKB <= 1000) {
      options = { ...options, maxSizeMB: 0.4, initialQuality: 0.6 };
      compressedImage = await imageCompression(file, options);
    } else if (sizeKB > 1000 && sizeKB <= 2000) {
      options = { ...options, maxSizeMB: 0.5, initialQuality: 0.5 };
      compressedImage = await imageCompression(file, options);
    }

    return { success: true, image: compressedImage };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Image processing failed" };
  }
};
