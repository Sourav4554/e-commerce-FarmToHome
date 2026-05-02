import React, { useState } from 'react'
import ProductRow from './ProductRow';
import useAdmin from '../../hooks/adminHook/useAdmin';
import toast from 'react-hot-toast';

const COLUMNS = [
    { label: "Image", className: "w-16" },
    { label: "Product Name", className: "min-w-[160px]" },
    { label: "Price", className: "min-w-[100px]" },
    { label: "Stock", className: "min-w-[120px]" },
    { label: "Category", className: "min-w-[140px]" },
    { label: "Actions", className: "min-w-[140px]" },
  ];

const ProductTable = ({products,expandedId,onToggle, fetchProductsForAdmin}) => {
  const {deleteWrongProduct}=useAdmin()
  const[bLoad,setBload]=useState(null)
    //method for delete product
    const deleteProductAdmin = async(id) => {
      setBload(id)
      
      const response = await deleteWrongProduct(id);
  
      if(!response.success){
      toast.error(response.message);
      return;
      }
      toast.success(response.message)
      setBload(null)
      await fetchProductsForAdmin()
    };

    if (products.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-4xl mb-4">📦</div>
            <p className="text-slate-400 text-sm font-mono">// no products found</p>
          </div>
        );
      }
    
  return (
    <div className=" border border-gray-200 overflow-hidden rounded-2xl">
      <div className="overflow-x-auto">
        <table className="  min-w-160 w-full text-sm text-left text-gray-700">
          {/* Table Header */}
          <thead className='bg-gray-50 py-5'>
            <tr className="">
              {COLUMNS.map(({ label, className }) => (
                <th
                  key={label}
                  className={`${className} px-4 py-3 text-left text-xs font-semibold
                               text-slate-800 uppercase tracking-wider font-mono`}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <ProductRow
                key={product._id}
                product={product}
                isExpanded={expandedId === product._id}
                onToggle={onToggle}
                deleteProductAdmin={deleteProductAdmin}
                bLoad={bLoad}
              />
            ))}
          </tbody>

          </table>
          </div>
          </div>
  )
}

export default ProductTable