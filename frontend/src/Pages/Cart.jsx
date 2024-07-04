import React, { useEffect, useState } from 'react'
import { VscError } from 'react-icons/vsc'
import CartItem from '../components/CartItem'
import { Link } from 'react-router-dom'



const cartItems = [
{
  prodcutId :"dgsdgfdg",
name:"Macbook",
price : 45000,
stock : 50,
Quantity : 4,
photo : 'https://m.media-amazon.com/images/I/71jG+e7roXL._AC_UY218_.jpg'
}


]
const subtotal = 4000
const tax = Math.round(subtotal * 0.18)
const shippingCharges = 200
const Discount = 500
const total = subtotal + tax + shippingCharges


function Cart() {


  const [couponCode, setCouponCode] = useState("")
  const [isValidcouponCode, setIsValidCouponCode] = useState(false)


useEffect(()=>{
const timeOutId = setTimeout(() => {
  if(Math.random() > 0.5) setIsValidCouponCode(true)
  else setIsValidCouponCode(false)
},1000);

return ()=>{

  clearTimeout(timeOutId)
 setIsValidCouponCode(false)
}

},[couponCode])



  return (
    <div className='cart'>
      <main>
{ cartItems.length > 0 ?  cartItems.map((i,idx)=>(
<CartItem key={idx}  CartItem = {i}/>
  )

  ) :<h1>No Items Added</h1>
}

      </main>
      <aside>
        <p>Subtotal : ₹{subtotal}</p>
        <p>Shipping Charges : ₹{shippingCharges}</p>
        <p>Tax : ₹{tax}</p>
        <p>
          Discount : <em> - ₹{Discount} </em>
          <p>
            <b>
              Total : {total}
            </b>
          </p>
        </p>

        <input
          type="text"
          value={couponCode}
          placeholder='Enter Coupon Code'
          onChange={(e) => setCouponCode(e.target.value)}
        />

        {
        couponCode && (
          isValidcouponCode ? (
            <span className='green'>₹{Discount} off using the Code   
            <code>{couponCode}</code></span> 
            ): (<span className='red'>
              Invalid <VscError /></span>
         ) 
        )
       }


       {
        cartItems.length> 0 && <Link to="/shipping">Checkout</Link>
       }

      </aside>
    </div>
  )
}

export default Cart