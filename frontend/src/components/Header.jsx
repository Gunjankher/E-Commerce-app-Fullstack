import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {FaSearch, FaShoppingBag, FaSignInAlt, FaUser,FaSignOutAlt} from "react-icons/fa"

const user = {
  _id : "",
  role :"",
}

function Header() {

const [isopen,setIsopen] = useState(false)


const logoutHandlar= ()=>{
  setIsopen(false)
}


  return (
    <nav className='header'>
      <Link onClick={()=> setIsopen(false)} to={'/'}>HOME</Link> 
     <Link onClick={()=> setIsopen(false)} to={"/search"}><FaSearch/></Link>
     <Link onClick={()=> setIsopen(false)}to={'/cart'}><FaShoppingBag /></Link> 

 {
user?._id?(
  <>
  <button onClick={()=> setIsopen((prev)=>!prev)}>
    <FaUser /> 
  </button>

  <dialog open = {isopen}>
    <div>
      {
        user.role === "admin"&&(
          <Link to="/admin/dashboard">Admin</Link>
        )}
<Link  onClick={()=> setIsopen(false)} to="/orders">orders</Link>  
<button onClick={logoutHandlar}>
  <FaSignOutAlt />
</button>
    </div>
  </dialog>
  </>
):<Link to={"/login"}>
  <FaSignInAlt/>
 
</Link>
}

    </nav>
  )
}

export default Header