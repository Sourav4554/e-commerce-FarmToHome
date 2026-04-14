import { IoIosSearch } from "react-icons/io";
import useCustomerHook from "../../hooks/customerHook/useCustomerHook";
import { useEffect, useState } from "react";
const FarmerFilter = ({ filteredData, setFilteredData }) => {
  const { filterDetails } = useCustomerHook();
  const [district, setDistrict] = useState([]);
  const [search, setSearch] = useState("");
  const [panchayth, setPanchayth] = useState([]);
  const [ward, setWard] = useState([]);

  //handling selectors
  const handleData = (e) => {
    const { name, value } = e.target;
    if (name === "search") {
      setSearch(value);
    } else {
      setFilteredData((prev) => ({
        ...prev,
        [name]: name === "ward" && value ? Number(value) : value,
      }));
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredData((prev) => ({
        ...prev,
        search: search,
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  //method for fetch filter details
  useEffect(() => {
    const getFilters = async () => {
      const response = await filterDetails();
      if (!response.success) {
        console.log(response.message);
      }
      setDistrict(response.district);
      setPanchayth(response.panchayth);
      setWard(response.ward);
    };
    getFilters();
  }, []);
  return (
    <div className="mt-6 ">
      {/* Top Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
        <select
          name="district"
          className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
          onChange={handleData}
        >
          <option value="">Select District</option>
          {district && district.length>0 && district.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          name="panchayth"
          className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
          onChange={handleData}
        >
          <option value="">Select Panchayath</option>
          {panchayth && panchayth.length && panchayth.map((item, index) => (
            <option key={index} name="" value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          name="ward"
          className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
          onChange={handleData}
        >
          <option value="">Select Ward</option>
          {ward && ward.length && ward.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Search */}
      <div className="relative mt-3  w-full max-w-2xl mx-auto flex items-center px-3 py-2">
        <input
          onChange={handleData}
          name="search"
          type="text"
          value={search}
          placeholder="Search farmers....."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
        />

        <IoIosSearch className="w-7 h-7 absolute left-5" />
      </div>
    </div>
  );
};

export default FarmerFilter;
