import { useEffect, useState } from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { userExist } from './redux/reducer/userReducer'




function App() {
  const [count, setCount] = useState(0)

const dispatch = useDispatch()
  

useEffect(()=>{
  onAuthStateChanged(auth,(user)=>{
    if(user){
      console.log(`user Logged in`)  
      dispatch(userExist())
    }
    else{
      console.log(`not Logged In`);
      
    }
  })
},[])

  return (
    <>
  <div>
    <Header />
    <main>
      <Outlet />
    </main>
  </div>
    </>
  )
}

export default App
