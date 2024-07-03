import React from 'react'
import {Link} from 'react-router-dom'
import {FaSearch, FaShoppingBag, FaSignInAlt, FaUser,FaSignOutAlt} from "react-icons/fa"

const user = {
  _id : "gg",
  role :"user",
}

function Header() {
  return (
    <nav>
      <Link to={'/'}>Home</Link> 
     <Link to={"/search"}><FaSearch/></Link>
     <Link to={'/cart'}><FaShoppingBag /></Link> 

{
user?._id?(
  <>
  <button>
    <FaUser /> 
  </button>

  <dialog open = {true}>
    <div>
      {
        user.role === "admin"&&(
          <Link to="/admin/dashboard">Admin</Link>
        )}
<Link to="/orders">orders</Link>  
<button>
  <FaSignOutAlt />
</button>
    </div>
  </dialog>
  </>
):<Link to={'/cart'}>
  <FaSignInAlt/>
  login
</Link>
}

    </nav>
  )
}

export default Header