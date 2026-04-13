import React, { useContext } from 'react'
import { cartContextProvider } from '../../context/CartContext'

const CartCheckoutPrice = () => {
    const {TotalAmount}=useContext(cartContextProvider)
  return (
    <div className="space-y-3">
    <div className="flex justify-between text-slate-600">
      <span>Subtotal</span>
      <span className="font-medium">₹{TotalAmount || 0}</span>
    </div>
    <div className="flex justify-between text-slate-600">
      <span>PlatformFee</span>
      <span className="font-medium">₹20</span>
    </div>
  

    {/* Divider */}
    <div className="border-t border-slate-200 pt-3"></div>

    {/* Total */}
    <div className="flex justify-between text-lg font-bold text-slate-900">
      <span>Total</span>
      <span>₹{TotalAmount+20 || 0}</span>
    </div>
  </div>
  )
}

export default CartCheckoutPrice