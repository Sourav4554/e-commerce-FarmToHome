import { FaSearch, FaCarrot, FaShoppingCart, FaTruck } from "react-icons/fa";

const steps = [
  {
    id: 1,
    title: "Find Farmers",
    desc: "Search nearby farmers in your area",
    icon: <FaSearch />,
  },
  {
    id: 2,
    title: "Explore Products",
    desc: "Browse fresh vegetables directly",
    icon: <FaCarrot />,
  },
  {
    id: 3,
    title: "Place Order",
    desc: "Add items to cart & checkout",
    icon: <FaShoppingCart />,
  },
  {
    id: 4,
    title: "Get Delivery",
    desc: "Receive fresh vegetables at home",
    icon: <FaTruck />,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-green-50">
      <div className="max-w-6xl mx-auto px-4 text-center">

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-green-800">
          How Farm 2 Home Works
        </h2>
        <p className="text-green-700 mt-2 text-sm md:text-base">
          Fresh vegetables directly from local farmers 🌱
        </p>

        {/* Steps */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 relative">

          {steps.map((step, index) => (
            <div key={step.id} className="relative flex flex-col items-center text-center max-w-xs">

              {/* Circle */}
              <div className="w-16 h-16 flex items-center justify-center rounded-full border-2 border-green-500 text-green-700 text-xl bg-white shadow-md">
                {step.id}
              </div>

              {/* Icon */}
              <div className="text-green-600 text-2xl mt-3">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="mt-3 font-semibold text-green-800">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-green-700 mt-1">
                {step.desc}
              </p>

              {/* Arrow (Desktop only) */}
              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-16 text-green-400 text-3xl">
                  →
                </div>
              )}
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;