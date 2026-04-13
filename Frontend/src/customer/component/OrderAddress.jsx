import React from "react";

const OrderAddress = ({ orderAddress, setOrderAddress }) => {
  //function for handle order address
  const handleOrderAddress = (e) => {
    const { name, value } = e.target;
    setOrderAddress((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="space-y-8 animate-fadeInUp">
      {/* Address Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-300">
        <h2 className="text-lg font-semibold text-slate-900 mb-6">
          Delivery Address
        </h2>

        <div className="space-y-5">
          {/* Full Name */}
          <div className="group">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              name='name'
              value={orderAddress.name}
              onChange={handleOrderAddress}
              className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200 placeholder:text-slate-400 group-hover:border-slate-300"
            />
          </div>

          {/* Phone Number */}
          <div className="group">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name='phone'
              value={orderAddress.phone}
              onChange={handleOrderAddress}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200 placeholder:text-slate-400 group-hover:border-slate-300"
            />
          </div>

          {/* District + Panchayath */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="group">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                District <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name='district'
                value={orderAddress.district}
                onChange={handleOrderAddress}
                placeholder="Ernakulam"
                className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200 placeholder:text-slate-400 group-hover:border-slate-300"
              />
            </div>
            <div className="group">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Panchayath <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="panchayath"
                value={orderAddress.panchayath}
                onChange={handleOrderAddress}
                placeholder="Kanayannur"
                className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200 placeholder:text-slate-400 group-hover:border-slate-300"
              />
            </div>
          </div>

          {/* Ward + Pincode */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="group">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Ward <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name='ward'
                value={orderAddress.value}
                onChange={handleOrderAddress}
                placeholder="Ward 12"
                className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200 placeholder:text-slate-400 group-hover:border-slate-300"
              />
            </div>
            <div className="group">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Pincode <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="pincode"
                value={orderAddress.pincode}
                onChange={handleOrderAddress}
                placeholder="682307"
                className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200 placeholder:text-slate-400 group-hover:border-slate-300"
              />
            </div>
          </div>

          {/* House Name + House Number */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="group">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                House Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name='houseName'
                value={orderAddress.houseName}
                onChange={handleOrderAddress}
                placeholder="Green Villa"
                className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200 placeholder:text-slate-400 group-hover:border-slate-300"
              />
            </div>
            <div className="group">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                House Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="houseNo"
                value={orderAddress.houseNo}
                onChange={handleOrderAddress}
                placeholder="42/A"
                className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200 placeholder:text-slate-400 group-hover:border-slate-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderAddress;
