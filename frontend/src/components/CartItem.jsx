import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function CartItem({CartItem,incrementhandler,decrementHandler,removeHandler}) {

    // {
    //     prodcutId :"dgsdgfdg",
    //   
    //   name:"Macbook",
    //   price : 45000,
    //   stock : 50,
    //   Quantity : 4,
    //   photo : 'https://m.media-amazon.com/images/I/71jG+e7roXL._AC_UY218_.jpg'
    //   }


const {photo,productId,name,price,quantity} = CartItem

  return (
    <div className='cart-item'>

<img src={photo} alt="" />
<article>
    <Link to={`/product/${productId}`}></Link>
    <span>₹{price}</span>
</article>

<div>
    <button onClick={()=> decrementHandler(CartItem)}>-</button>
<p>{quantity}</p>
    <button  onClick={()=> incrementhandler(CartItem)}>+</button>
</div>

<button  onClick={()=> removeHandler(productId)}>
    <FaTrash />
</button>


    </div>
  )
}

export default CartItem