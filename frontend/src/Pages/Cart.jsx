import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { VscError } from 'react-icons/vsc'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CartItemCard from '../components/CartItem'
import { addToCart, calculatePrice, discountApplied, removeCartItem } from '../redux/reducer/cartReducer'
import axios from 'axios'
import { server } from '../redux/store'








function Cart() {



  const {cartItems,subtotal,tax,shippingCharges,discount,total } = useSelector((state) => state.cartReducer)
  console.log(`discount ffdfdw`,discount);
  

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
const {token:cancelToken, cancel} = axios.CancelToken.source()

    const timeOutId = setTimeout(() => {


axios.get(`${server}/api/v1/payment/discount?coupon=${couponCode}`,{cancelToken})
    .then((res) => {
        console.log('Discount response:', res.data); // Ensure this is correct
        if (res.data.statusCode) {
            const discount = res.data.data.discount; // Make sure to get the discount correctly
            dispatch(discountApplied(discount)); // Apply discount
            setIsValidCouponCode(true);
        } else {
            // Handle error case here
            console.error('Invalid coupon');
            dispatch(discountApplied(0)); // Reset discount if invalid
            setIsValidCouponCode(false);
        }
        dispatch(calculatePrice()); // Recalculate price after discount
    })
    .catch((error) => {
        console.error('Error applying discount:', error);
        dispatch(discountApplied(0)); // Reset discount on error
        setIsValidCouponCode(false);
        dispatch(calculatePrice()); // Recalculate price without discount
    }); }, 1000);


    return () => {

      clearTimeout(timeOutId)
      cancel()
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
          <br/>
       <br/>
            Total : {total}
        

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