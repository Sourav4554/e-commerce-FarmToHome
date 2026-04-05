import React, { useState } from "react";
import { productCustomHook } from "../../hooks/productHook/productHook";
import toast from "react-hot-toast";
import cloudinaryUpload from "../../utilities/CloudinaryUpload";
import { validateImage } from "../../utilities/ValidateImage";
const AddProduct = () => {
  const { signedUrlFun, saveProduct, loading } = productCustomHook();

  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    unit: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  });

  //get data from form
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  //retrieve image
  const handleImage = (e) => {
    const image = e.target.files[0];
    if (image) {
      setFile(image);
      setPreview(URL.createObjectURL(image));
    }
  };

  const submitProduct = async (e) => {
    e.preventDefault();
    const imageValidation= await validateImage(file)
    if(!imageValidation.success){
      toast.error(imageValidation.message)
      return
    }
    //cloudinary upload function evoke
    const cloudinaryRes = await cloudinaryUpload(imageValidation.image, signedUrlFun);
    if (cloudinaryRes) {
      const updatedData = {
        ...productData,
        image: cloudinaryRes,
      };

      const response = await saveProduct(updatedData);
      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
      setProductData({
        name: "",
        category: "",
        price: "",
        unit: "",
        stock: "",
        description: "",
        image: "",
      });
      setPreview("");
      setFile(null);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-emerald-50/30 to-slate-50">
      <form onSubmit={submitProduct}>
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}

          <h1 className="mb-8 text-3xl font-bold text-slate-900 tracking-tight">
            Add Product
          </h1>

          {/* Product Description Section */}
          <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-8 mb-6 border border-slate-200/60">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">
              Product Description
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Product Name
                </label>
                <input
                  required
                  onChange={changeHandler}
                  type="text"
                  name="name"
                  value={productData.name}
                  placeholder="Enter product name"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Category
                </label>
                <select
                  required
                  onChange={changeHandler}
                  name="category"
                  value={productData.category}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-slate-900 appearance-auto bg-white cursor-pointer"
                >
                  <option value="">Select a category</option>
                  <option value="electronics">Vegitable</option>
                  <option value="clothing">Fruit</option>
                </select>
              </div>

              {/* Unit */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Unit
                </label>
                <select
                  required
                  name="unit"
                  onChange={changeHandler}
                  value={productData.unit}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-slate-900 appearance-auto bg-white cursor-pointer"
                >
                  <option value="">Select a category</option>
                  <option value="kg">kg</option>
                  <option value="pcs">Pcs</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                    ₹
                  </span>
                  <input
                    required
                    onChange={changeHandler}
                    type="number"
                    name="price"
                    value={productData.price}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                    step="1"
                    min={0}
                  />
                </div>
              </div>
            </div>

            {/* Stock */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Stock
              </label>
              <input
                required
                type="number"
                onChange={changeHandler}
                name="stock"
                value={productData.stock}
                placeholder="Enter available stock quantity"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                min="0"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Description
              </label>
              <textarea
                required
                name="description"
                placeholder="Receipt Info"
                onChange={changeHandler}
                value={productData.description}
                rows="4"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-slate-900 placeholder:text-slate-400 resize-none"
              />
            </div>
          </div>

          {/* Product Images Section */}
          <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 p-8 border border-slate-200/60">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">
              Products Images
            </h2>

            {/* Upload Area */}
            <div className="relative border-2 border-dashed rounded-xl p-12 transition-all border-slate-300 bg-slate-50/50 hover:border-emerald-400 hover:bg-emerald-50/30 ">
              <input
                required
                type="file"
                id="file-upload"
                accept="image/*"
                className="hidden"
                onChange={handleImage}
              />

              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <p className="text-slate-700 mb-1">
                    <span className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                      Click to upload
                    </span>
                  </p>
                  <p className="text-sm text-slate-500">SVG, PNG, JPG or GIF</p>
                </div>
              </label>
            </div>

            {/* Image Preview Grid */}

            <div className="relative max-w-2xs group rounded-lg overflow-hidden border border-slate-200 bg-slate-50 mt-4">
              <div className="w-full h-32 bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                {!preview ? (
                  <span className="text-slate-400 text-xs">Image Preview</span>
                ) : (
                  <img
                    src={preview}
                    alt="uploaded image"
                    className="w-full object-cover"
                  />
                )}
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                className="px-8 cursor-pointer py-3 rounded-lg bg-linear-to-r from-green-600 to-green-500 text-white font-medium shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 hover:from-green-700 hover:to-green-600 transition-all duration-200 transform hover:-translate-y-0.5"
                type="submit"
                disabled={loading}
              >
                {loading ? "Publishing..." : "Publish Product"}
              </button>
            </div>
          </div>

          {/* Action Buttons */}
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
