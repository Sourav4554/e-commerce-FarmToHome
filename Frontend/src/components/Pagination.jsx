const Pagination = ({ page, setPage, totalPages,loading }) => {
 // console.log("total pages inside pagination", totalPages);
  return (
    <div className="flex items-center justify-center gap-1 md:gap-2 mt-10">
      {/* Prev Button */}
      <button
        className="px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 transition cursor-pointer"
        onClick={() => setPage(page - 1)}
        disabled={page === 1 || loading }
      >
        Prev
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1 || loading)}
            className={`w-10 h-10 flex items-center justify-center rounded-xl border transition cursor-pointer
           ${
             page === index + 1
             ? "bg-green-500 text-white border-green-500"
             : "bg-white text-gray-700 border-gray-300 hover:bg-green-100 hover:text-green-700"
            }`}
          >
            {index + 1 }
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        className="px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-600 hover:bg-gray-100 transition cursor-pointer"
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages || loading }
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
