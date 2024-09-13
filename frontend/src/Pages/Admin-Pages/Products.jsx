import React, { useEffect } from 'react'

import AdminSideBar from './../../components/Admin-components/AdminSideBar'
import { useCallback, useState } from "react";
import TableHOC from "../../components/Admin-components/TableHOC";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useAllProductsQuery } from '../../redux/api/productApi';
import { useSelector } from 'react-redux';
import { server } from '../../redux/store';
import toast from 'react-hot-toast';


const columns = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];



const Products = () => {
  
  const [rows,setRows] = useState([]);
  const {user} = useSelector((state)=>state.userReducer)
  const {data, isError,} = useAllProductsQuery(user?._id)
  
  if (isError) {
    toast.error('Some error occured')
  }


  useEffect(() => {
    if (data?.data && data.data.length > 0) {
      setRows(
        data?.data?.map((i) => ({
          photo: <img src={`${server}${i.photos[0]?.url}`} alt={i.name} />,
          name: i.name,
          price: i.price,
          stock: i.stock,
          action: <Link to={`/admin/product/${i._id}`}>Manage</Link>,
        }))
      )
    } else {
     console.log(`fk yaar`);
     
    }
  }, [data]);
  
  
  
  
  // console.log(`Array Data`,Array.isArray(data));// log says flase
// console.log(`Array Data`,Array.isArray(rows));  // log says true

// console.log(`type of data`, typeof data); // log says object
// console.log(`type of data`, typeof rows); // log says object


// console.log(`data products`,data)

  const Table = useCallback(
    TableHOC(columns, rows, "dashboard-product-box", "Products", true),
    [rows]
  );

  
  
  return (
    <div className="adminContainer">
    <AdminSideBar />
    <main>{ <Table />}</main>
    <Link to="/admin/product/new" className="create-product-btn">
      <FaPlus />
    </Link>
  </div>
  );
};

export default Products;



// photo: <img src={`${server}/${i.photo}`}/>,
// name: i.name,
// price: i.price,
// stock: i.stock,
// action: <Link to={`/admin/product/${i._id}`}>Manage</Link>,