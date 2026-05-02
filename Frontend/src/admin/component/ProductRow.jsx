
import VendorDetails from "./VendorDetails";

const CATEGORY_STYLES = {
  "Food & Grocery": "bg-amber-400/10 text-amber-400 border-amber-400/30",
  Handicrafts: "bg-indigo-400/10 text-indigo-400 border-indigo-400/30",
  Spices: "bg-orange-400/10 text-orange-400 border-orange-400/30",
  "Eco Products": "bg-emerald-400/10 text-emerald-400 border-emerald-400/30",
  "Personal Care": "bg-pink-400/10 text-pink-400 border-pink-400/30",
};

const getCategoryStyle = (category) =>
  CATEGORY_STYLES[category] ||
  "bg-slate-400/10 text-slate-400 border-slate-400/30";

const ProductRow = ({ product, isExpanded, onToggle ,deleteProductAdmin,bLoad}) => {


  const isOutOfStock = product.stock === 0;




  return (
    <>
      <tr
        className={`border-b border-gray-200 transition-colors
          ${isExpanded ? "bg-gray-50" : "hover:bg-gray-50"}`}
      >
        {/* Image */}
        <td className="px-4 py-3">
          <div className="w-11 h-11 rounded-lg overflow-hidden border border-gray-200 bg-gary-800 shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        </td>

        {/* Product Name */}
        <td className="px-4 py-3">
          <p className="text-slate-800 text-sm font-medium whitespace-nowrap">
            {product.name}
          </p>
        </td>

        {/* Price */}
        <td className="px-4 py-3">
          <span className="text-slat-800 text-sm font-semibold font-mono whitespace-nowrap">
            ₹{product?.price || 0}
          </span>
        </td>

        {/* Stock */}
        <td className="px-4 py-3">
          {isOutOfStock ? (
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                             bg-red-500/10 text-red-400 border border-red-500/30 whitespace-nowrap"
            >
              Out of Stock
            </span>
          ) : (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span className="text-slate-800 text-sm  font-medium">
                {product.stock}
              </span>
            </div>
          )}
        </td>

        {/* Category */}
        <td className="px-4 py-3">
          <span
            className={`inline-block px-2.5 py-0.5 rounded-full text-slate-800 text-xs font-medium  whitespace-nowrap
                        ${getCategoryStyle(product.category)}`}
          >
            {product.category}
          </span>
        </td>

        {/* Actions */}
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            {/* Expand / Collapse Button */}
            <button
              onClick={() => onToggle(product._id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border
                          transition-all duration-150
                          ${
                            isExpanded
                              ? "bg-green-500/20 border-indigo-500/50 text-indigo-300"
                              : "bg-green-700 border-slate-600 text-white hover: hover:border-slate-500"
                          }`}
            >
              <span
                className={`transition-transform duration-200 ${
                  isExpanded ? "rotate-180" : "rotate-0"
                }`}
              >
                ▾
              </span>
              {isExpanded ? "Hide" : "Vendor"}
            </button>

            {/* Delete Button */}
            <button
              onClick={() => deleteProductAdmin(product._id)}
              className="flex items-center justify-center w-8 h-8 rounded-lg
                         bg-red-500/10 border border-red-500/25 text-red-400
                         hover:bg-red-500/25 hover:border-red-500/50
                         transition-colors text-sm"
              title="Delete product"
            >
              {bLoad===product._id?'...':'x'}
            </button>
          </div>
        </td>
      </tr>

      {/* Expanded Vendor Details Row */}
      {isExpanded && (
        <tr>
          <td colSpan={6} className="p-0">
            <VendorDetails vendor={product.VendorId} />
          </td>
        </tr>
      )}
    </>
  );
};

export default ProductRow;
