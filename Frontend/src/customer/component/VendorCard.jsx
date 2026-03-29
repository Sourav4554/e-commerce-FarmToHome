import { FaLocationDot, FaHashtag } from "react-icons/fa6";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

const VendorCard = ({ name, district, ward, panchayth, createdAt }) => {

  //date convert to dd/mm/yy formal
  const newDate=new Date(createdAt)
  const date = `${String(newDate.getDate())}-${newDate.getMonth()}-${newDate.getFullYear()}`


  return (
    <section
      className="flex flex-col sm:flex-row bg-white rounded-2xl 
    shadow-[0_0_15px_rgba(0,0,0,0.1)] overflow-hidden p-3.5
    hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] transition duration-300"
    >
      {/* Image */}
      <div className="w-full h-48 sm:w-40 sm:h-auto shrink-0">
        <img
          className="w-full h-full object-cover"
          src="data:image/webp;base64,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"
          alt="farmer"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-4 w-full">
        {/* Top */}
        <div>
          <div className="flex justify-between items-start sm:items-center">
            <h2 className="text-base sm:text-lg font-semibold">{name}</h2>

            <div className="flex items-center gap-1 text-yellow-500">
              <FaStar />
              <span className="text-xs sm:text-sm text-gray-700">4.8/5</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-600 mt-3">
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-gray-500" />
              <span>{district}</span>
            </div>

            <div className="flex items-center gap-1">
              <FaLocationDot className="text-gray-500" />
              <span>{panchayth}</span>
            </div>

            <div className="flex items-center gap-1">
              <FaHashtag className="text-gray-500" />
              <span>ward: {ward}</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-4">
          <div>
            <p className="text-xs text-gray-500">Registered on</p>
            <p className="text-sm font-semibold text-gray-600">{date}</p>
          </div>

          <button
            className="w-full sm:w-auto bg-primary hover:bg-green-800 
          transition-colors text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            View Shop
          </button>
        </div>
      </div>
    </section>
  );
};

export default VendorCard;
