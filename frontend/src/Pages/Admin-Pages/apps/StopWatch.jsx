import React, { useEffect, useState } from 'react'
import AdminSideBar from '../../components/AdminSideBar'

const timeinformat =(timeinSeconds)=>{
const hour = Math.floor(timeinSeconds/3600)
const miniuts = Math.floor((timeinSeconds/60)/60)
const Seconds = (timeinSeconds %60)


const hourformat = hour.toString().padStart(2, "0")
const minuteformat = miniuts.toString().padStart(2, "0")
const secondformat = Seconds.toString().padStart(2, "0")


return `${hourformat}:${minuteformat}:${secondformat}`


}

function StopWatch() {

const [time,setTime]= useState(0)
const [isRunning,setIsRunning] = useState(false)


const resethandlar = ()=>{
setTime(0)
setIsRunning(false)

}


useEffect(()=>{
let intervalID ; 

if(isRunning){
  intervalID = setInterval(() => {
setTime((prev)=> prev+1)
  },1000 );
}

return ()=>{
  clearInterval(intervalID)
}

},[isRunning])



  return (
    <div className='adminContainer'>
    <AdminSideBar />

    <main className='dashboard-app-container'>
      <section>
<div className='stopwatch'>
<h2>{timeinformat(time)}</h2>
<button onClick={()=> setIsRunning((prev)=> !prev)}>{isRunning ? "stop":"start"}</button>
<button onClick={resethandlar}>Reset</button>

</div>


      </section>
    </main>

</div>
  )
}

export default StopWatch