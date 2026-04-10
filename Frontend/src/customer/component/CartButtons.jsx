import React, { useContext } from 'react'
import CartQuantityButton from './CartQuantityButton'
import { cartContextProvider } from '../../context/CartContext'
const CartButtons = ({products}) => {
  const {addToCart,productIdentity}=useContext(cartContextProvider)
  return (
    <div className="space-y-3">
          <CartQuantityButton productId={products._id}/>
          <button className=" bg-green-600 hover:bg-green-700 text-white py-3 px-5 rounded-lg font-medium transition shadow"
          onClick={()=>addToCart(products._id)}
          disabled={productIdentity}
          >
            {productIdentity===products._id?'Adding.....':"Add to Cart"}
            
          </button>
        </div>
  )
}

export default CartButtons