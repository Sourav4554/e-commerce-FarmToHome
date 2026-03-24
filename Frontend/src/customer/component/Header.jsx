import React from "react";

const Header = () => {
  return (
    <div className="flex justify-center  p-4">
      <section className="z-0 relative w-full h-[70vh] md:h-[80vh] rounded-xl overflow-hidden">
        {/* Background Image */}
        <img
          src="/customerheader.avif" // place inside public folder
          alt="Farm"
          className="w-full h-full object-cover brightness-75"
        />

        {/* Overlay */}
        <div className="absolute z-0 inset-0 bg-linear-to-r from-black/60 to-black/20"></div>

        {/* Content */}
        <div className="absolute top-1/2 left-[16%] md:left-[8%] transform -translate-y-1/2 text-white max-w-[90%] z-0 sm:max-w-[70%] md:max-w-[40%]">
          <h1 className="text-3xl sm:text-4xl md:text-[44px] font-bold leading-tight">
            Eat Fresh , Support Local , Live Healthy Always
          </h1>

          <p className="mt-3 text-sm sm:text-base text-gray-300">
            Bring home nutrient-rich vegetables while empowering local farmers.
          </p>

          <button className="mt-6 ml-[8%] md:ml-0 px-6 py-3 bg-primary rounded-lg font-medium transition duration-300 hover:bg-green-700 hover:-translate-y-1 cursor-pointer">
            Explore Farmers
          </button>
        </div>
      </section>
    </div>
  );
};

export default Header;
