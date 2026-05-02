import { useEffect, useState } from "react";
import useAdmin from "../../hooks/adminHook/useAdmin";

const StatCard = ({ icon, value, label, pill, sub, color }) => {
  const themes = {
    green:  { card: "border-green-100",  icon: "bg-green-100",  value: "text-green-800",  pill: "bg-green-100 text-green-800"   },
    red:    { card: "border-red-100",    icon: "bg-red-100",    value: "text-red-800",    pill: "bg-red-100 text-red-800"       },
    teal:   { card: "border-teal-100",   icon: "bg-teal-100",   value: "text-teal-800",   pill: "bg-teal-100 text-teal-800"     },
    blue:   { card: "border-blue-100",   icon: "bg-blue-100",   value: "text-blue-800",   pill: "bg-blue-100 text-blue-800"     },
    amber:  { card: "border-amber-100",  icon: "bg-amber-100",  value: "text-amber-800",  pill: "bg-amber-100 text-amber-800"   },
    purple: { card: "border-purple-100", icon: "bg-purple-100", value: "text-purple-800", pill: "bg-purple-100 text-purple-800" },
    slate:  { card: "border-slate-200",  icon: "bg-slate-100",  value: "text-slate-800",  pill: "bg-slate-100 text-slate-700"   },
  };
  const t = themes[color];

  return (
    <div className={`bg-white rounded-2xl p-5 border-2 ${t.card} hover:-translate-y-1 hover:shadow-lg transition-all duration-200`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3 ${t.icon}`}>
        {icon}
      </div>
      <p className={`text-3xl font-bold leading-none mb-1 ${t.value}`}>{value}</p>
      <p className="text-sm text-gray-500 font-medium mb-2">{label}</p>
      {pill && (
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${t.pill}`}>{pill}</span>
      )}
      {sub && (
        <>
          <hr className="my-3 border-gray-100" />
          {sub.map(({ label: l, val }) => (
            <div key={l} className="flex justify-between text-xs mt-1.5">
              <span className="text-gray-400 font-medium">{l}</span>
              <span className="font-bold text-gray-600">{val}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

const SectionLabel = ({ children }) => (
  <p className="text-xs font-bold tracking-widest uppercase text-green-500 mb-3 mt-6 first:mt-0">
    {children}
  </p>
);

export default function AdminDashboard() {

  const [stats, setStats] = useState(null);
  const { fetchDashboard } = useAdmin();

  const fetchDetails = async () => {
    const response = await fetchDashboard();
    console.log(response)
    if (!response.success) {
      console.log(response.message);
      return;
    }
    setStats(response.stats);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  // ✅ Bug 3 fixed: guard against null before destructuring
  if (!stats) {
    return (
      <div className="p-7 bg-[#f7faf7] min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-sm font-medium animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  const { products, orders, users } = stats;

  return (
    <div className="p-7 bg-[#f7faf7] min-h-screen">
      <SectionLabel>📦 Products</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2">
        <StatCard icon="🛍️" value={products.totalProducts} label="Total Products"
          pill={`${products.totalStock} units in stock`} color="green" />
        <StatCard icon="✅" value={products.inStock} label="In Stock"
          pill={`${Math.round((products.inStock / products.totalProducts) * 100)}% available`} color="teal" />
        <StatCard icon="❌" value={products.outOfStock} label="Out of Stock"
          pill={`${Math.round((products.outOfStock / products.totalProducts) * 100)}% depleted`} color="red" />
      </div>

      <SectionLabel>🧾 Orders</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2">
        <StatCard icon="📋" value={orders.totalOrders} label="Total Orders" color="blue"
          sub={[
            { label: "Delivered", val: orders.delivered },
            { label: "Pending",   val: orders.pending   },
            { label: "Cancelled", val: orders.cancelled },
          ]}
        />
        <StatCard icon="🚚" value={orders.delivered} label="Delivered"
          pill={`${Math.round((orders.delivered / orders.totalOrders) * 100)}% success rate`} color="green" />
        <StatCard icon="🚫" value={orders.cancelled} label="Cancelled"
          pill={`${Math.round((orders.cancelled / orders.totalOrders) * 100)}% cancel rate`} color="red" />
      </div>

      <SectionLabel>👥 Users</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon="👤" value={users.totalUsers} label="Total Users" color="purple"
          sub={[
            { label: "Customers", val: users.customers },
            { label: "Vendors",   val: users.vendors   },
          ]}
        />
        <StatCard icon="🏪" value={users.vendors} label="Vendors"
          pill={`${Math.round((users.vendors / users.totalUsers) * 100)}% of users`} color="amber" />
        <StatCard icon="🧑‍🛒" value={users.customers} label="Customers"
          pill={`${Math.round((users.customers / users.totalUsers) * 100)}% of users`} color="slate" />
      </div>
    </div>
  );
}