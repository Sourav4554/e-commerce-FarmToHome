import React from 'react'

const OrderTabs = ({tabs,setActiveTab,activeTab}) => {
  return (
    <div className="flex gap-1 p-1 bg-gray-100 rounded-2xl mb-6 w-fit">
    {tabs.map(({ key, label, count }) => (
      <button
        key={key}
        onClick={() => setActiveTab(key)}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
          activeTab === key
            ? "bg-white text-green-700 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        {label}
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-bold transition-colors ${
            activeTab === key
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          {count}
        </span>
      </button>
    ))}
  </div>
  )
}

export default OrderTabs