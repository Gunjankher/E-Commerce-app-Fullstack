import React, { useState } from 'react'
import AdminSideBar  from '../../components/AdminSideBar'

function NewProduct() {
 
  const [name,setName] = useState("")
  const [price,setPrice] = useState(Number)
  const [stock,setStock] = useState(Number)
  const [photo,setPhoto] = useState("")

  const changeImageHandler = (e)=>{
 const file = e.target.files?.[0]

const reader = new FileReader()

if(file){
  reader.readAsDataURL(file)
  reader.onloadend=()=>{
    if(typeof reader.result === "string") setPhoto(reader.result)
  }
}


  }


  return (
    <div className='adminContainer'>
      <AdminSideBar />
      <main className='product-management'>

<article>
<form>
<h2>New Product</h2>

<div>
  <label> Name</label>
<input 
required
type="text"
placeholder = "Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>
</div>
<div>
  <label>price</label>
<input 
required
type="number"
placeholder = "price"
value={price}
min={0}
onChange={(e)=>setPrice(Number(e.target.value))}
/>
</div>
<div>
  <label>Stock</label>
<input 
required
type="number"
placeholder ="Number"
value={stock}
min={0}
onChange={(e)=>setStock(Number(e.target.value))}
/>
</div>

<div>
  <label>photo</label>
<input 
required
type="file"
onChange={changeImageHandler}
/>
</div>

{photo && <img  src={photo} alt='new Image'/>}

<button type='submit'>Create</button>

</form>
</article>



      </main>
      
      </div>
  )
}

export default NewProduct