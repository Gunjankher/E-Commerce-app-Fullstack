import React, { useState,useEffect } from 'react'
import AdminSideBar from '../../components/AdminSideBar'


const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";


function Coupon() {

const [prefix,setPrefix] = useState("")
const [coupon,setCoupon] = useState("")
const [includeNumbers, setIncludeNumbers] = useState(false);
const [includeCharacters, setIncludeCharacters] = useState(false);
const [includeSymbols, setIncludeSymbols] = useState(false);
const [isCopied, setIsCopied] = useState(false);
const [size,setSize] = useState(8)

const copyText = async(coupon)=>{

await window.navigator.clipboard.writeText(coupon)
setIsCopied(true)
}



const submitHandler = (e)=>{

  e.preventDefault()

  if (!includeNumbers && !includeCharacters && !includeSymbols)
    return alert("Please Select One At Least");

let result = prefix || ""
let looplength = size - result.length

for(let i=0; i<looplength; i++){
  let entireString = ""
  if (includeCharacters) entireString += allLetters;
  if (includeNumbers) entireString += allNumbers;
  if (includeSymbols) entireString += allSymbols;

let randomNum = Math.floor(Math.random()* entireString.length)
result +=entireString[randomNum]
}

setCoupon(result)


}
useEffect(() => {
  setIsCopied(false);
}, [coupon]);


  return (
    <div className='adminContainer'>
    <AdminSideBar />

    <main className="dashboard-app-container">
      <h1>Coupon</h1>
      <section>
        <form className="coupon-form" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Text to include"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            maxLength={size}
          />

          <input
            type="number"
            placeholder="Coupon Length"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            min={8}
            max={25}
          />

          <fieldset>
            <legend>Include</legend>

            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers((prev) => !prev)}
            />
            <span>Numbers</span>

            <input
              type="checkbox"
              checked={includeCharacters}
              onChange={() => setIncludeCharacters((prev) => !prev)}
            />
            <span>Characters</span>

            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols((prev) => !prev)}
            />
            <span>Symbols</span>
          </fieldset>
          <button type="submit">Generate</button>
        </form>

        {coupon && (
          <code>
            {coupon}{" "}
            <span onClick={() => copyText(coupon)}>
              {isCopied ? "Copied" : "Copy"}
            </span>{" "}
          </code>
        )}
      </section>
    </main>

</div>
  )
}

export default Coupon