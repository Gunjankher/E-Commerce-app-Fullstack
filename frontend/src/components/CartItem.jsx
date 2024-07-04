import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function CartItem({CartItem}) {

    // {
    //     prodcutId :"dgsdgfdg",
    //   
    //   name:"Macbook",
    //   price : 45000,
    //   stock : 50,
    //   Quantity : 4,
    //   photo : 'https://m.media-amazon.com/images/I/71jG+e7roXL._AC_UY218_.jpg'
    //   }


const {photo,prodcutId,name,price,Quantity} = CartItem

  return (
    <div className='cart-item'>

<img src={photo} alt="" />
<article>
    <Link to={`/product/${prodcutId}`}></Link>
    <span>₹{price}</span>
</article>

<div>
    <button>-</button>
<p>{Quantity}</p>
    <button>+</button>
</div>

<button>
    <FaTrash />
</button>


    </div>
  )
}

export default CartItem