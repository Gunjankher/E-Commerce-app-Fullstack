import { useEffect, useState } from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { userExist, userNotExist } from './redux/reducer/userReducer'
import { getUser } from './redux/api/userApi'





function App() {
  const [count, setCount] = useState(0)

const dispatch = useDispatch()
  

useEffect(()=>{
  onAuthStateChanged(auth,async(user)=>{
    if (user) {
      const response = await getUser(user.uid);
      console.log('getUser response:', response); 

      if (response && response.data) {
        const dispatchedData = dispatch(userExist(response.data));
        console.log('Dispatched data:', dispatchedData);
      } else {
        console.error('Invalid user data structure:', response);
      }
    } else {
      dispatch(userNotExist());
      console.log('logged out');
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
