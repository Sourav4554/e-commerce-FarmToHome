import React, { useState } from "react";
import { FaLock, FaShoppingBag} from "react-icons/fa";
import CartReview from "./CartReview";
import CartCheckoutPrice from "./CartCheckoutPrice";
import PaymentButton from "./PaymentButton";

const Checkout = ({paymentMethod,setPaymentMethod,placeOrderMethod}) => {
    
  return (
    <div className="lg:sticky lg:top-24 space-y-6 animate-fadeInUp animation-delay-200">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-br from-slate-50 to-white border-b border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
            <FaShoppingBag className="w-5 h-5" />
            Review Your Cart
          </h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Cart Items */}
          <CartReview />

          {/* Divider */}
          <div className="border-t border-slate-200"></div>

          {/* Divider */}
          <div className="border-t border-slate-200"></div>

          {/* Price Breakdown */}
          <CartCheckoutPrice />
          <PaymentButton
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          />
          {/* Payment CTA */}
          <button className="w-full bg-linear-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 group"
          onClick={placeOrderMethod}
          >
            <span>{paymentMethod==='COD'?"Place Order":"Proceed To Payment"}</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Security Note */}
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 pt-2">
            <FaLock className="w-4 h-4" />
            <span>Secure Checkout • SSL Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
