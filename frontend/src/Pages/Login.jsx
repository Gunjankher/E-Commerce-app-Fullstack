import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import {FcGoogle} from 'react-icons/fc'
import { auth } from '../firebase'
import { useLoginMutation } from '../redux/api/userApi'


function Login() {

const [gender,setGender] = useState("")
const [date,setDate] = useState("")

const [login] = useLoginMutation()



const loginHandler = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);

    const res = await login({
      name: "gk",
      email: "sdaf",
      gender,
      role: "user",
      dob: date,
      _id: "gkkk"
    });

    if (res && res.data) {
      toast.success(res.data.message);
    } else if (res && res.error) {
      const error = res.error;
      const message = error.data || { message: 'Unknown error occurred' };
      toast.error(message.message);
    } else {
      toast.error('Unknown error occurred');
    }

    console.log(user);
  } catch (error) {
    toast.error('Sign in Failed');
    console.error('Something went wrong with sign in', error);

    // Log detailed error response
    if (error.response) {
      console.error('Error response:', error.response);
    }
  }
};




  return (
    <div className="login">
    <main>
      <h1 className="heading">Login</h1>
      <div>
        <label>Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div>
        <label>Date of birth</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div>
        <p>Already Signed In Once</p>
        <button onClick={loginHandler}>
          <FcGoogle /> <span>Sign in with Google</span>
        </button>
      </div>
    </main>
  </div>
  )
}

export default Login