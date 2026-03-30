const Pagination = () => {
  return (
    <div className="flex items-center justify-center gap-1 md:gap-2 mt-10">
      {/* Prev Button */}
      <button className="px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 transition">
        Prev
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-300 bg-white text-gray-700 hover:bg-green-100 hover:text-green-700 transition"
          >
            {num}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button className="px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 transition">
        Next
      </button>
    </div>
  );
};

export default Pagination;
