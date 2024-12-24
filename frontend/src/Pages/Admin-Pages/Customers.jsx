import React, { useEffect } from 'react'

import AdminSideBar from './../../components/Admin-components/AdminSideBar'
import { useState, useCallback } from "react";
import TableHOC from "../../components/Admin-components/TableHOC";
import { FaTrash } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useAllUsersQuery, useDeleteUserMutation } from '../../redux/api/userApi';
import { Link } from 'react-router-dom';
import {responseToast} from '../../utilis/feature'


const columns = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

// const img = "https://randomuser.me/api/portraits/women/54.jpg";
// const img2 = "https://randomuser.me/api/portraits/women/50.jpg";

// const arr = [
//   {
//     avatar: (
//       <img
//         style={{
//           borderRadius: "50%",
//         }}
//         src={img}
//         alt="Shoes"
//       />
//     ),
//     name: "Emily Palmer",
//     email: "emily.palmer@example.com",
//     gender: "female",
//     role: "user",
//     action: (
//       <button>
//         <FaTrash />
//       </button>
//     ),
//   },
//   {
//     avatar: (
//       <img
//         style={{
//           borderRadius: "50%",
//         }}
//         src={img2}
//         alt="Shoes"
//       />
//     ),
//     name: "May Scoot",
//     email: "aunt.may@example.com",
//     gender: "female",
//     role: "user",
//     action: (
//       <button>
//         <FaTrash />
//       </button>
//     ),
//   },
// ];



function Customers() {


  const {user}= useSelector((state)=> state.userReducer)
  const {isLoading,data,isError} = useAllUsersQuery(user?._id)
  const [rows,setRows] = useState([]);


  const[deleteUser] = useDeleteUserMutation()
  
const deleteHandler = async(userId)=>{
  const res = await deleteUser({ userId, adminUserId: user?._id });
  responseToast(res, null, "");
}


  useEffect(() => {
    if (data?.data && data?.data?.length > 0) {
      setRows(
        data?.data?.map((i) => ({
          avatar: (
            <img
              style={{
                borderRadius: "50%",
              }}
              src={i.photo}
              alt={i.name}
            />
          ),
          name: i.name,
          email: i.email,
          gender: i.gender,
          role: i.role,
          action: (
            <button onClick={() => deleteHandler(i._id)}>
              <FaTrash />
            </button>
      ),
        
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
     "Customers",
      true
  ),
  [rows]
)



  return (
    <div className='adminContainer'>
    <AdminSideBar/>
    <main>{Table()}</main>
    
        </div>
  )
}

export default Customers