import React, { useState } from 'react';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

// Load Stripe key
const stripePromise = loadStripe("pk_test_51Pi92eEUnA0gmIEIVDenhuV6PI2NYbH9medQ1U2WB5qYpGu2g6B4w5Jf2oOCTiBAymvvsdv5EsH2c8JktFmuR4Lh00cUM7vGbz");

const CheckoutForm = () => {
  
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const submithandler = async (e) => {
    e.preventDefault();
  
    if (!stripe || !elements) return;
  
    setIsProcessing(true);
  
    const orderData = {}; // Your order data
  
    // Try to confirm the payment
    let paymentIntent;
    try {
      paymentIntent = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: window.location.origin },
        redirect: "if_required",
      });
    } catch (error) {
      if (error.payment_intent) {
        // Payment intent already exists; handle it appropriately
        paymentIntent = await stripe.paymentIntents.retrieve(error.payment_intent.id);
      } else {
        setIsProcessing(false);
        return toast.error(error.message || "Something Went Wrong");
      }
    }
  
    if (paymentIntent.status === "succeeded") {
      // const res = await newOrder(orderData);
      // dispatch(resetCart());
      console.log(`placing orders`);
      navigate("/orders");
      // responseToast(res, navigate, "/orders");
    } else {
      setIsProcessing(false);
      toast.error("Payment not successful.");
    }
    setIsProcessing(false);
  };
  

  return (
    <div className='checkout-container'>
      <form onSubmit={submithandler}>
        <PaymentElement />
        <button type='submit' disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
};

function Checkout() {

const location = useLocation()

const clientSecret = location.state?.clientSecret;

// if(!clientSecret) return <Navigate to={"/shipping"} />


  return <Elements 
  options={{
    // clientSecret : "pi_3Q5KJ3EUnA0gmIEI0qu78McH_secret_EfKzf9QiBENNdbaYvnTxI5yTz",
    clientSecret,
    //  mode: "payment",
    // paymentMethodTypes: ['card'] // restrict to card payments
  }}
  stripe={stripePromise}>
<CheckoutForm />
  </Elements>
}

export default Checkout;
