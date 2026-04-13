import React from 'react'

const CartReviewProduct = ({image,name,category,quantity,price}) => {
  return (
    <div className="flex gap-4 group">
    <div className="w-20 h-20 bg-linear-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300">
     
      <img src={image} alt="" />
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="font-medium text-slate-900 mb-1 truncate">
        {name}
      </h3>
      <div className="flex items-center gap-3 text-sm text-slate-500">
        <span>Qty: {quantity}</span>
        <span>•</span>
        <span>{category}</span>
      </div>
    </div>
    <div className="text-right shrink-0">
      <div className="font-semibold text-slate-900">₹{price}</div>
    </div>
  </div>
  )
}

export default CartReviewProduct