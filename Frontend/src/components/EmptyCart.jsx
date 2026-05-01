import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      
      {/* Icon */}
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-3xl mb-4">
        🛒
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800">
        Your cart is empty
      </h2>

      {/* Description */}
      <p className="text-gray-500 mt-2 max-w-md">
        Looks like you haven’t added anything yet. Explore fresh products from nearby farmers.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/products")}
        className="mt-6 px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
      >
        Go to Shop
      </button>
    </div>
  );
};

export default EmptyCart;