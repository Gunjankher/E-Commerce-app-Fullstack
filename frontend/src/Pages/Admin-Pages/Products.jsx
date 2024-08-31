import React, { useEffect } from 'react'

import AdminSideBar from './../../components/Admin-components/AdminSideBar'
import { useCallback, useState } from "react";
import TableHOC from "../../components/Admin-components/TableHOC";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useAllProductsQuery } from '../../redux/api/productApi';
import { useSelector } from 'react-redux';
import { Skeleton } from '../../components/Loader';
import { server } from '../../redux/store';


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

// const img =
//   "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

// const img2 = "https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg";

// const arr = [
//   {
//     photo: <img src={img} alt="Shoes" />,
//     name: "Puma Shoes Air Jordan Cook Nigga 2023",
//     price: 690,
//     stock: 3,
//     action: <Link to="/admin/product/sajknaskd">Manage</Link>,
//   },
//   {
//     photo: <img src={img2} alt="Shoes" />,
//     name: "Macbook",
//     price: 232223,
//     stock: 213,
//     action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
//   },
//   {
//     photo: <img src={img} alt="Shoes" />,
//     name: "Puma Shoes Air Jordan Cook Nigga 2023",
//     price: 690,
//     stock: 3,
//     action: <Link to="/admin/product/sajknaskd">Manage</Link>,
//   },
//   {
//     photo: <img src={img2} alt="Shoes" />,
//     name: "Macbook",
//     price: 232223,
//     stock: 213,
//     action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
//   },
//   {
//     photo: <img src={img} alt="Shoes" />,
//     name: "Puma Shoes Air Jordan Cook Nigga 2023",
//     price: 690,
//     stock: 3,
//     action: <Link to="/admin/product/sajknaskd">Manage</Link>,
//   },
//   {
//     photo: <img src={img2} alt="Shoes" />,
//     name: "Macbook",
//     price: 232223,
//     stock: 213,
//     action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
//   },
//   {
//     photo: <img src={img2} alt="Shoes" />,
//     name: "Macbook",
//     price: 232223,
//     stock: 213,
//     action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
//   },
// ];

const Products = () => {

  const {user} = useSelector((state)=>state.userReducer)
  const {data,isLoading,error} = useAllProductsQuery(user?._id)
  

  
  const [rows,setRows] = useState([]);


// useEffect(()=>{
//   if (data&& data.data)
//     setRows(
//       data?.data.map((i) => ({
//         photo: <img src={`${server}/${i.photo}`} />,
//         name: i.name,
//         price: i.price,
//         stock: i.stock,
//        action: <Link to={`/admin/product/${i._id}`}>Manage</Link>,
//        }))
//     );
// },[data])





useEffect(() => {
    if (data?.data && data?.data.length > 0) {
      setRows(
        data?.data?.map((i) => ({
          photo: (
            <img
              src={`${server}/${i.photos[0]?.url}`}
              alt={i.name}
            />
          ),
          name: i.name,
          price: i.price,
          stock: i.stock,
          action: <Link to={`/admin/product/${i._id}`}>Manage</Link>,
        }))
      );
    } 
  
}, [data]);


// if (isLoading) return <div>Loading...</div>;
// if (error) return <div>Error loading products</div>;


console.log(`data products` , data);

  const Table = useCallback(
    TableHOC(columns, rows, "dashboard-product-box", "Products", true),
    []
  );

  return (
    <div className="adminContainer">
      <AdminSideBar />
      <main>{isLoading ? <Skeleton length={20}/>:<Table />}</main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;