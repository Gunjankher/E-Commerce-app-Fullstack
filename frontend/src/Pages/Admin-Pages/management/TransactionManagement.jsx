import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDeleteOrderMutation, useOrderDetailsQuery, useUpdateOrderMutation } from '../../../redux/api/orderApi';
import AdminSideBar from './../../../components/Admin-components/AdminSideBar';
import { server } from '../../../redux/store';
import {responseToast} from '../../../utilis/feature'



  const orderItems = []
  const defaultData = {
    shippingInfo :
    {
      name: "",
  address: "",
  city: "",
  state: "",
  country: "",
  pincode: 0, 
  },
  status: "",
  subtotal: 0,
  discount:0 ,
  shippingCharges: 0,
  tax: 0,
  total: 0,
  orderItems : [],
  user :{name :"", _id :"",  },
  _id :""
  }

function TransactionManagement() {
  const params = useParams()
  const navigate = useNavigate()

  const {user}= useSelector((state)=> state.userReducer)
  const {isLoading,data,isError} = useOrderDetailsQuery(params.id)

console.log(data);


const {
  shippingInfo :{address,city,state,country,pincode,},
   orderItems,
  //  user:{name},
   status,
   tax,
   subtotal,
   total,
   discount,
  shippingCharges,
  } = data?.data|| defaultData

  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const [order, setOrder] = useState({});

  const updateHandler = async () => {
    const res = await updateOrder({
      userId: user?._id,
      orderId: data?.data?._id,
    });
    responseToast(res, navigate, "/admin/transaction");
  };

  const deleteHandler = async () => {
    const res = await deleteOrder({
      userId: user?._id,
      orderId: data?.data?._id,
    });
    responseToast(res, navigate, "/admin/transaction");
  };


if(isError) return <Navigate to={"/404"}/>

  return (
    <div className='adminContainer'>
    <AdminSideBar />
    <main className='product-management'>
<section>
  <h2>Order Items</h2>
  {
    orderItems.map((i)=>(
      <ProductCard
      key={i.name}
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
  <button className='product-delete-btn' onClick={deleteHandler}>
    <FaTrash />
  </button>

<h1>Order Info</h1>
<p>User Info</p>
<p>name :{name}</p>
<p>
            Address: {`${address} ${city} ${state} ${country} ${pincode}`}
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
  <img src={`${server}${photo[0]?.url}`} />
    <Link to={`/product/${_id}`}>{name}</Link>
    <span>
      ${price} X {quantity} = ${price * quantity}
    </span>
  </div>
);

export default TransactionManagement