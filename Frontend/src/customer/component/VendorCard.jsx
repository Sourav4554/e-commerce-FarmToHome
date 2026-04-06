import { FaLocationDot, FaHashtag } from "react-icons/fa6";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import noProfileLogo from '../../asscets/Starter pfp.jpeg'
const VendorCard = ({ name, district, ward, panchayth, createdAt,image }) => {

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
          src={image || noProfileLogo}
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
