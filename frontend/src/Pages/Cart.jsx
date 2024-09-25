import React, { useEffect, useState } from 'react'
import { VscError } from 'react-icons/vsc'
import CartItem from '../components/CartItem'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'






function Cart() {



  const {cartItems,subtotal,tax,shippingCharges,Discount,total} = useSelector((state)=>state.cartReducer)

  const [couponCode, setCouponCode] = useState("")
  const [isValidcouponCode, setIsValidCouponCode] = useState(false)
  const dispatch = useDispatch()


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
{ cartItems?.length > 0 ?  cartItems.map((i,idx)=>(
<CartItem key={idx}  CartItem = {i}/>
  )
  
) :(<h1>No Items Added</h1>)
}

      </main>
      <aside>
        <p>Subtotal : ₹{subtotal}</p>
        <p>Shipping Charges : ₹{shippingCharges}</p>
        <p>Tax : ₹{tax}</p>
        <p>
          Discount : <em className='red'> - ₹{Discount} </em>
        
            <b>
              Total : {total}
            </b>
          
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
        cartItems?.length> 0 && <Link to="/shipping">Checkout</Link>
       }

      </aside>
    </div>
  )
}

export default Cart