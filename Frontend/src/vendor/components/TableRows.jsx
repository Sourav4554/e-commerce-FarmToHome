import React from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import DeleteAlert from "./DeleteAlert";
import { useNavigate } from "react-router-dom";

const TableRows = ({
  id,
  index,
  image,
  name,
  category,
  price,
  stock,
  unit,
  showPopup,
  setShowPoPUp,
  
}) => {
    const navigate=useNavigate()
  return (
    <>
    <tbody>
      <tr
        // className="border-b dark:border-neutral-500 bg-white"
        className={`border-b ${stock <= 0 ? "bg-red-200" : "bg-white"}`}
        key={id}
      >
        <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
        <td className="whitespace-nowrap px-6 py-4">
          <img src={image} alt="" width="50" height="50" />
        </td>
        <td className="whitespace-nowrap px-6 py-4">{name}</td>
        <td className="whitespace-nowrap px-6 py-4">{category}</td>
        <td className="whitespace-nowrap px-6 py-4">₹{price}</td>
        <td className="whitespace-nowrap px-6 py-4">
          {stock <= 0 ? "out of stock" : stock} {stock > 0 && unit}
        </td>
        <td className="whitespace-nowrap px-6 py-4 flex items-center gap-4">
          <MdModeEdit className="text-blue-500 cursor-pointer hover:text-blue-700 text-xl transition" 
          onClick={()=>navigate(`/vendor/edit-product/${id}`)}
          />
          <MdDelete className="text-red-500 cursor-pointer hover:text-red-700 text-xl transition" 
          onClick={()=>setShowPoPUp(!showPopup)}
          />
        </td>
      </tr>
    </tbody>
     {showPopup && (
        <DeleteAlert showPopup={showPopup} setShowPoPUp={setShowPoPUp} id={id}/>
      )}
      </>
  );
};

export default TableRows;
