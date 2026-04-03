import usermodel from "../Models/usermodel.js";
import AppError from "../Utilities/AppError.js";

//service for fetch vendor
export const fetchvendorService = async (query) => {
  const limit = parseInt(query.limit) || 8;
  const page = parseInt(query.page) || 1;
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
  return { vendors, page, totalPages: Math.ceil(totalPages / limit) };
};

//service for filtering vendors
export const filterService = async (query) => {
  const { district, panchayth, ward, search } = query;
  const filter = {
    role: "vendor",
    isapproved: true,
  };
  if (district) filter.district = { $regex: district, $options: "i" };
  if (panchayth) filter.panchayth =  { $regex: panchayth, $options: "i" };
  if (ward) filter.ward = ward;
  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  const filteredProducts = await usermodel.find(filter);
  return filteredProducts;
};

//Service for fetch districts wards and panchayath of vendors
export const fetchvendorFiltersService = async () => {
  const result = await usermodel.aggregate([
    {
      $group: {
        _id: null,
        district: { $addToSet: "$district" },
        panchayth: { $addToSet: "$panchayth" },
        ward: { $addToSet: "$ward" },
      },
    },
    {
      $project: {
        _id: 0,
        district: { $sortArray: { input: "$district", sortBy: -1 } },
        panchayth: { $sortArray: { input: "$panchayth", sortBy: 1 } },
        ward: { $sortArray: { input: "$ward", sortBy: 1 } },
      },
    },
  ]);
  if (result.length <= 0) {
    throw new AppError("no data found", 404);
  }
  return result;
};
