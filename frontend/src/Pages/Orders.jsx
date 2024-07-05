import React from 'react'
import TableHOC from '../components/Admin-components/TableHOC';

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

    const Table = TableHOC(column, rows, "dashboard-product-box", "Orders", rows.length > 6)();

    return (
      <div className="container">
        <h1>My Orders</h1>
        {isLoading ? <Skeleton length={20} /> : Table}
      </div>
    );
  };


export default Orders