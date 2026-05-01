const VendorDetails = ({ vendor }) => {
    console.log(vendor)
    const initials = vendor?.name
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  
    const fields = [
      { label: "Email", value: vendor.email, icon: "✉" },
      { label: "Phone", value: vendor.phone, icon: "📞" },
      { label: "District", value: vendor.district, icon: "📍" },
      { label: "Panchayat", value: vendor.panchayth, icon: "🏘" },
      { label: "Ward", value: vendor.ward, icon: "🗂" },
    ];
  
    return (
      <div className="bg-gray-100 border-t border-slate-700 px-6 py-5">
        {/* Vendor Header */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {initials}
          </div>
          <div>
            <p className="text-slate-800 font-semibold text-sm">{vendor.name}</p>
            <p className="text-slate-400 text-xs mt-0.5">Verified Vendor</p>
          </div>
          <span className="ml-auto text-xs font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 px-3 py-1 rounded-full">
            Active
          </span>
        </div>
  
        {/* Vendor Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {fields.map(({ label, value, icon }) => (
            <div
              key={label}
              className="flex items-start gap-3 bg-gray-200 rounded-lg px-4 py-3"
            >
              <span className="text-slate-400 text-sm mt-0.5">{icon}</span>
              <div className="min-w-0">
                <p className="text-slate-800 text-xs uppercase tracking-wide font-medium">
                  {label}
                </p>
                <p className="text-slate-900 text-sm mt-0.5 truncate">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default VendorDetails;