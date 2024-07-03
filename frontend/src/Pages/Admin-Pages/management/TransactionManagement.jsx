import React, { useState } from 'react'
import AdminSideBar  from '../../components/AdminSideBar'
import { Link } from 'react-router-dom';
const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

  const orderItems = [
    {
      name: "Puma Shoes",
      photo: img,
      _id: "asdsaasdas",
      quantity: 4,
      price: 2000,
    },
  ];

function TransactionManagement() {

const [order,setOrder] = useState({
  name: "Abhishek Singh",
  address: "77 Black Street",
  city: "Neyword",
  state: "Nevada",
  country: "India",
  pinCode: 2434341,
  status: "Processing",
  subtotal: 4000,
  discount: 1200,
  shippingCharges: 0,
  tax: 200,
  total: 4000 + 200 + 0 - 1200,
  orderItems,
  _id: "asdnasjdhbn",

})  


const {
  name,
  address,
  city,
  country,
  state,
  pinCode,
  subtotal,
  shippingCharges,
  tax,
  discount,
  total,
  status,
} = order;


const updateHandler = () => {
  setOrder((prev) => ({
    ...prev,
    status: prev.status === "Processing" ? "Shipped" : "Delivered",
  }));
};



  return (
    <div className='adminContainer'>
    <AdminSideBar />
    <main className='product-management'>
<section>
  <h2>Order Items</h2>
  {
    orderItems.map((i)=>(
      <ProductCard
      name={i.name}
      photo={i.photo}
      _id={i._id}
      quantity={i.quantity}
      price={i.price}
    />
    ))
  }
</section>

<article className='shipping-info-card'>

<h1>Order Info</h1>
<p>User Info</p>
<p>name :{name}</p>
<p>
            Address: {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
          </p>
          <h5>Amount Info</h5>
          <p>Subtotal: {subtotal}</p>
          <p>Shipping Charges: {shippingCharges}</p>
          <p>Tax: {tax}</p>
          <p>Discount: {discount}</p>
          <p>Total: {total}</p>
          <h5>Status Info</h5>
          Status : {" "}
          <span
          className={
           status === "Delivered" 
           ? "purple"
           : status === "Shipped"
           ? "green" 
           : "red"

          }
          >
            {status}

          </span>
          <button onClick={updateHandler}>Process Status</button>

</article>



    </main>
    
    </div>
  )
}


const ProductCard = ({ name, photo, price, quantity, _id }) => (
  <div className="transaction-product-card">
    <img src={photo} alt={name} />
    <Link to={`/product/${_id}`}>{name}</Link>
    <span>
      ${price} X {quantity} = ${price * quantity}
    </span>
  </div>
);

export default TransactionManagement