import { FaLeaf, FaUsers, FaTruck, FaComments } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-green-800">
          Why Choose Farm 2 Home
        </h2>
        <p className="text-green-700 mt-2 text-sm md:text-base">
          Fresh, local and trusted farming experience 🌱
        </p>

        {/* Layout */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-10">

          {/* LEFT SIDE */}
          <div className="flex flex-col gap-8 max-w-xs text-right">

            <div>
              <div className="flex items-center justify-end gap-3">
                <h3 className="font-semibold text-green-800">
                  Fresh & Organic
                </h3>
                <FaLeaf className="text-green-600 text-xl" />
              </div>
              <p className="text-sm text-green-700 mt-1">
                Directly harvested from farms, no storage delay
              </p>
            </div>

            <div>
              <div className="flex items-center justify-end gap-3">
                <h3 className="font-semibold text-green-800">
                  Local Farmers
                </h3>
                <FaUsers className="text-green-600 text-xl" />
              </div>
              <p className="text-sm text-green-700 mt-1">
                Support farmers in your own area
              </p>
            </div>

          </div>

          {/* CENTER */}
          <div className="flex flex-col items-center">

            <div className="w-40 h-40 md:w-52 md:h-52 rounded-full 
            bg-green-100 flex items-center justify-center 
            shadow-[0_0_25px_rgba(0,0,0,0.1)]">

              {/* Replace with farmer image */}
              <img
                src="https://media.istockphoto.com/id/866393210/vector/farm-icon.jpg?s=612x612&w=0&k=20&c=CZnGt4ER-NjDGJJMzyYaGEz3ko9BoYnuf2vNRp-cMfc="
                alt="farmer"
                className="w-24 md:w-32 rounded-full"
              />
            </div>

            <h3 className="mt-4 font-semibold text-green-800">
              Trusted Local Platform
            </h3>
            <p className="text-sm text-green-700 mt-1 text-center max-w-xs">
              Connecting farmers directly to customers without middlemen
            </p>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-8 max-w-xs text-left">

            <div>
              <div className="flex items-center gap-3">
                <FaTruck className="text-green-600 text-xl" />
                <h3 className="font-semibold text-green-800">
                  Fast Delivery
                </h3>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Fresh products delivered quickly to your home
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <FaComments className="text-green-600 text-xl" />
                <h3 className="font-semibold text-green-800">
                  Direct Contact
                </h3>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Chat with farmers via WhatsApp easily
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;