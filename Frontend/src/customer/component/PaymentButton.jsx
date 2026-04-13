import React from 'react'
import {  FaCreditCard, FaWallet } from "react-icons/fa";
const PaymentButton = ({paymentMethod,setPaymentMethod}) => {

  const handlePaymentToogle=(id)=>{
      setPaymentMethod(id)
  }

    const paymentOptions = [
        {
          id: "COD",
          title: "Cash on Delivery",
          subtitle: "Pay when you receive",
          icon: FaWallet,
        },
        {
          id: "ONLINE",
          title: "Online Payment",
          subtitle: "UPI, Cards, Wallets",
          icon: FaCreditCard,
        },
      ];
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-300">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">
              Payment Method
            </h2>


<div className="space-y-4">
  {paymentOptions.map((option) => {
    const isSelected = paymentMethod === option.id;
    const Icon = option.icon;
    return (
      <label
        key={option.id}
        className={`group relative flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all duration-300
          ${
            isSelected
              ? "border-slate-900 bg-slate-900 text-white hover:bg-slate-800"
              : "border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50"
          }`}
      >
        <input
          type="radio"
          name="payment"
          checked={isSelected}
          onChange={() => handlePaymentToogle(option.id)}
          className={`w-5 h-5 ${
            isSelected ? "accent-slate-900" : "accent-slate-500"
          }`}
        />

        <Icon
          className={`w-5 h-5 ${
            isSelected ? "text-white" : "text-slate-700"
          }`}
        />

        <div className="flex-1">
          <div className="font-medium">{option.title}</div>
          <div
            className={`text-sm ${
              isSelected ? "text-slate-300" : "text-slate-500"
            }`}
          >
            {option.subtitle}
          </div>
        </div>

        <div
          className={`absolute inset-0 rounded-xl bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            !isSelected && "hidden"
          }`}
        ></div>
      </label>
    );
  })}
</div>
          </div>
  )
}

export default PaymentButton