import VendorCardSkeleton from "../../components/VendorCardSkenlton";
import FarmerFilter from "./FarmerFilter";
import VendorCard from "./VendorCard";

const FarmersHero = ({ vendors, filteredData, setFilteredData, loading }) => {
  return (
    <section className="px-6 py-12 bg-linear-to-b from-green-50 via-white to-white min-h-screen">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
              Explore Our Farmers
            </h2>

            <p className="text-gray-500 text-sm sm:text-base mt-2">
              Find nearby farmers and explore their products
            </p>
          </div>

          {/* Optional badge */}
          <div className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-medium shadow-sm">
            Local & Fresh
          </div>
        </div>
        <FarmerFilter
          filteredData={filteredData}
          setFilteredData={setFilteredData}
        />
        {/* Divider */}
        <div className="mt-6 h-px bg-linear-to-r from-transparent via-green-200 to-transparent" />
      </div>

      {/* List Container */}
      <div className="max-w-6xl mx-auto">
        <div
          className="
                    grid gap-6
                    sm:grid-cols-1
                    md:grid-cols-1
                    lg:grid-cols-2
                  "
        >
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <VendorCardSkeleton key={index} />
            ))
          ) : vendors.length > 0 ? (
            vendors.map((item) => (
              <VendorCard
                key={item._id}
                id={item._id}
                name={item.name}
                district={item.district}
                panchayth={item.panchayth}
                ward={item.ward}
                createdAt={item.createdAt}
                image={item.avatar}
              />
            ))
          ) : (
            <h3 className="text-gray-500">We Cant find Vendors</h3>
          )}
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-10" />
    </section>
  );
};

export default FarmersHero;
