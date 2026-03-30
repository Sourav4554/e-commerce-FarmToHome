import usermodel from "../Models/usermodel.js";
import AppError from "../Utilities/AppError.js";

//service for fetch vendor
export const fetchvendorService = async (query) => {
  const { limit, page } = query;
  console.log(limit,page)
  if (!limit || !page) {
    throw new AppError("Query not provided", 401);
  }
  const skip = (page - 1) * limit;
  const totalPages = await usermodel.countDocuments({
    role: "vendor",
    isapproved: true,
  });
  const vendors = await usermodel
    .find({ role: "vendor", isapproved: true })
    .select("-password")
    .skip(skip)
    .limit(limit)
    .sort({ createAt: -1 });
  return {vendors,page,totalPages:Math.ceil(totalPages/limit)};
};

//service for filtering customers

export const filterService = async (query) => {
  const { district, panchayth, ward, search } = query;
  const filter = {
    role: "vendor",
    isapproved: true,
  };
  if (district) filter.district = district;
  if (panchayth) filter.panchayth = panchayth;
  if (ward) filter.ward = ward;
  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }
  const filteredProducts = await usermodel.find(filter);
  return filteredProducts;
};
