import React from "react";
import { Navigate ,NavLink} from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  UserCircle,
  Menu,
  X
} from 'lucide-react';
const Sidebar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };
  
    const closeMobileMenu = () => {
      setIsMobileMenuOpen(false);
    };
  
    const menuItems = [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/admin-dashboard' },
      { name: 'Products', icon: Package, path: '/admin/products' },
      { name: 'Orders', icon: ShoppingBag, path: '/admin/orders' },
      { name: 'Vendors', icon: Users, path: '/admin/vendors' },
      { name: 'Customers', icon: UserCircle, path: '/admin/customers' },
    ];
  return (
    <>
      <button
        onClick={toggleMobileMenu}
        className="fixed top-4 left-0 z-50 p-2 rounded-lg  sm:hidden transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={closeMobileMenu}
        />
      )}
      {/**sidebar start */}
      <aside
        className={`
          fixed top-0 left-0 z-40 w-64 h-full 
          transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0 ' : '-translate-x-full '}
          sm:translate-x-0
        `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white border-r border-gray-200 shadow-lg">
          {/* Logo */}
          <div className="flex items-center ps-2.5 mb-8 pt-2">
            <div className="w-8 h-8 bg-linear-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="ml-3 text-xl text-gray-900 font-bold tracking-tight">
              Dashboard
            </span>
          </div>

          {/* Navigation Menu */}
          <nav>
            <ul className="space-y-1.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <NavLink
                      to={item.path}
                      onClick={closeMobileMenu}
                      className={({ isActive }) =>
                        `flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                          isActive
                            ? 'bg-green-50 text-green-600 shadow-sm '
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <Icon
                            className={`w-5 h-5 transition-colors duration-200 ${
                              isActive
                                ? 'text-green-600'
                                : 'text-gray-400 group-hover:text-gray-600'
                            }`}
                          />
                          <span className="ml-3 font-medium">{item.name}</span>
                        </>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
      {/**sidebar end */}
    </>
  );
};

export default Sidebar;
