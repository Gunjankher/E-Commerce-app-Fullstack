import React, { useEffect, useState } from 'react'
import TableHOC from '../components/Admin-components/TableHOC';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAllOrdersQuery, useMyOrdersQuery } from '../redux/api/orderApi';


function Orders() {

  const {user}= useSelector((state)=> state.userReducer)
  const {isError,isLoading,data} =useMyOrdersQuery(user?._id)

    const column = [
        {
          Header: "ID",
          accessor: "_id",
        },
        {
          Header: "Quantity",
          accessor: "quantity",
        },
        {
          Header: "Discount",
          accessor: "discount",
        },
        {
          Header: "Amount",
          accessor: "amount",
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

      const [rows,setRows] = useState([])



      useEffect(() => {
        if (data?.data && data?.data.length > 0) {
          setRows(
            data?.data?.map((i) => ({
          _id :i._id,
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



    const Table = TableHOC(column, rows, "dashboard-product-box", "Orders", rows.length > 6)

    return (
      <div className="container">
        <h1>My Orders</h1>
       <Table />
      </div>
    );
  };


export default Orders