import React, { useState } from 'react'
import TableHOC from '../components/Admin-components/TableHOC';
import { Link } from 'react-router-dom';

function Orders() {



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

      const [rows,setRows] = useState([{
        _id : "dfdsgsdg",
        amount : 5000,
        discount : 6545,
        status: <span className="red">Processing</span>,
        action: <Link to={`/order/dfdsgsdg`}>Manage</Link>,

      },])

    const Table = TableHOC(column, rows, "dashboard-product-box", "Orders", rows.length > 6)

    return (
      <div className="container">
        <h1>My Orders</h1>
       <Table />
      </div>
    );
  };


export default Orders