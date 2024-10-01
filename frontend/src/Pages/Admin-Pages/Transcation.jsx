import React, { useEffect } from 'react';

import { useCallback, useState } from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import TableHOC from "../../components/Admin-components/TableHOC";
import { useAllOrdersQuery } from '../../redux/api/orderApi';
import AdminSideBar from './../../components/Admin-components/AdminSideBar';

const columns = [
  {
    Header: "Avatar",
    accessor: "user",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];






function Transcation() {

  const {user}= useSelector((state)=> state.userReducer)
  const {isLoading,data,isError} = useAllOrdersQuery(user?._id)
  console.log(`transction data`, data);
  const [rows,setRows] = useState([]);


useEffect(() => {
  if (data?.data && data?.data.length > 0) {
    setRows(
      data?.data?.map((i) => ({
    user :i.user,
    amount :i.total,
    discount : i.discount,
    quantity :i.orderItems.length,
    status: (
      <span
        className={
          i.status === "Processing"
            ? "red"
            : i.status === "Shipped"
            ? "green"
            : "purple"
        }
      >
        {i.status}
      </span>
    ),
    action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
      
      })),
    )
  } else {
   console.log(`fk yaar`);
   
  }
}, [data]);





const Table = useCallback(
TableHOC(
columns,
rows,
"dashboard-product-box", 
"Transcation",
 true

)

)



  return (
    <div className='adminContainer'>
    <AdminSideBar/>
    <main>{Table()}</main>
    
        </div>
  )
}

export default Transcation