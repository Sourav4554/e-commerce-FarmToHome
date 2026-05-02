import React, { useEffect, useState, useMemo } from "react";
import useAdmin from "../../hooks/adminHook/useAdmin";
import ProductTable from "../component/ProductTable";
import Pagination from "../../components/Pagination";
import { Loader } from "lucide-react";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [expandedId, setExpandedId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { fetchAdminProducts,loading } = useAdmin();

  //fetch products details
  const fetchProductsForAdmin = async () => {
    const response = await fetchAdminProducts(page);
    if (!response.success) {
      console.log(response.message);
      return;
    }
    setProducts(response?.products);
    setPage(response?.page);
    setTotalPages(response.totalPages);
  };

  //expand for vendor details
  const handleToggle = (id) =>
    setExpandedId((prev) => (prev === id ? null : id));

  useEffect(() => {
    fetchProductsForAdmin();
  }, [page]);

  if(loading){
    
  return (
    <div className="relative overflow-x-auto bg-white shadow-sm rounded-lg border border-gray-200">
    <div className="flex justify-center items-center py-12">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
      <span className="ml-3 text-gray-600">Loading products...</span>
    </div>
  </div>
    )
  }


  return (
    <div className="min-h-screen ">
      {/* ── Top Nav Bar ── */}
      <header className="   px-6 py-4 flex items-center justify-between flex-wrap gap-3 sticky top-0 z-40">
        <div>
          <h1 className="text-xl font-bold text-black tracking-tight">
            Product Management
          </h1>
          <p>Manage all products details</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono    text-indigo-400 px-3 py-1.5 rounded-full">
            {products.length} Products
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-7">
        <ProductTable
          products={products}
          expandedId={expandedId}
          onToggle={handleToggle}
          fetchProductsForAdmin={ fetchProductsForAdmin}
          // onDelete={handleDeleteRequest}
        />
      </main>
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        loading={loading}
      />
    </div>
  );
};

export default Products;
