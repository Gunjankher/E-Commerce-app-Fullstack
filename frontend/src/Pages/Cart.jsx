import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { VscError } from 'react-icons/vsc'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CartItemCard from '../components/CartItem'
import { addToCart, calculatePrice, removeCartItem } from '../redux/reducer/cartReducer'







function Cart() {



  const { cartItems, subtotal, tax, shippingCharges, discount, total } = useSelector((state) => state.cartReducer)

  const [couponCode, setCouponCode] = useState("")
  const [isValidcouponCode, setIsValidCouponCode] = useState(false)
  const dispatch = useDispatch()



  const incrementhandler = (cartItem) => {

    if (cartItem.quantity >= cartItem.stock) return
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }))

  }
  const decrementHandler = (cartItem) => {
    if (cartItem.quantity <= 1) return
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }))

  }
  const removeHandler = (productId) => {
    dispatch(removeCartItem(productId))
    toast.success("removed from cart")

  }



  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (Math.random() > 0.5) setIsValidCouponCode(true)
      else setIsValidCouponCode(false)
    }, 1000);

    return () => {

      clearTimeout(timeOutId)
      setIsValidCouponCode(false)
    }

  }, [couponCode])

  useEffect(() => {

    dispatch(calculatePrice())

  }, [cartItems])


  return (
    <div className='cart'>
      <main>
        {cartItems?.length > 0 ? cartItems.map((i, idx) => (
          <CartItemCard
            key={idx}
            CartItem={i}
            incrementhandler={incrementhandler}
            decrementHandler={decrementHandler}
            removeHandler={removeHandler}
          />
        )

        ) : (<h1>No Items Added</h1>)
        }

      </main>
      <aside>
        <p>Subtotal : ₹{subtotal}</p>
        <p>Shipping Charges : ₹{shippingCharges}</p>
        <p>Tax : ₹{tax}</p>
        <p>
          Discount : <em className='red'> - ₹{discount} </em>
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
              <span className='green'>₹{discount} off using the Code
                <code>{couponCode}</code></span>
            ) : (<span className='red'>
              Invalid <VscError /></span>
            )
          )
        }


        {
          cartItems?.length > 0 && <Link to="/shipping">Checkout</Link>
        }

      </aside>
    </div>
  )
}

export default Cart