import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };
  //array of navItems
  const navItems = [
    { id: 1, text: "Home", path: "/" },
    { id: 2, text: "Farmers", path: "/farmers" },
    { id: 3, text: "Products", path: "/products" },
    { id: 4, text: "Cart", path: "/cart" },
    { id: 5, text: "Register", path: "register",varient:'button'},
  ];
  //helper function for handling color in navbar
  const handleColor=({isActive},varient)=>{
  const base=`  py-3 px-6 rounded-xl m-2 cursor-pointer hover:text-primary duration-300 `
  if(varient==='button'){
    return `m-2 py-3 px-6 bg-primary text-white rounded-xl`
   }
   return `${base} ${isActive?"text-primary":"text-gray-600"}`
  }
  return (
    <nav className="flex justify-between items-center p-4 md:py-0 ">
      {/* Logo */}
      <h1 className="w-full font-bold md:text-xl text-primary">Farm2Home</h1>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex ">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={(props)=>handleColor(props,item.varient)}
          >
            {item.text}
          </NavLink>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-10 w-full h-full  ease-in-out duration-500 z-20 bg-white"
            : "ease-in-out w-full duration-500 fixed top-0 bottom-0 -left-full z-20 bg-white"
        }
      >
        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive,}) =>
              `p-4 duration-300 hover:text-primary cursor-pointer block ${
                isActive? "text-primary " : "text-gray-600"
              }`
            }
          >
            {item.text}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
