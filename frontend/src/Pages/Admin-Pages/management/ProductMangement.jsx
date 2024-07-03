import React,{useState} from 'react'
import AdminSideBar  from '../../components/AdminSideBar'

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";


function ProductMangement() {
  const [name,setName] = useState("Puma Shoes")
  const [price,setPrice] = useState(2000)
  const [stock,setStock] = useState(10)
  const [photo,setPhoto] = useState(img)

  const [nameUpdate,setNameUpdate] = useState(name)
  const [priceUpdate,setPriceUpdate] = useState(price)
  const [stockUpdate,setStockUpdate] = useState(stock)
  const [photoUpdate,setPhotoUpdate] = useState(photo)


  const changeImageHandler = (e)=>{
    const file = e.target.files?.[0]
   
   const reader = new FileReader()
   
   if(file){
     reader.readAsDataURL(file)
     reader.onloadend=()=>{
       if(typeof reader.result === "string") setPhotoUpdate(reader.result)
     }
   }
   
   
  }
  
  const SubmitHandaler =(e)=>{
    e.preventDefault()
    setName(nameUpdate);
    setPrice(priceUpdate);
    setStock(stockUpdate);
    setPhoto(photoUpdate); 
    
    
  }
  
  return (
    <div className='adminContainer'>
      <AdminSideBar />
      <main className='product-management'>
<section>
<strong>ID - asnmdkasndmsan</strong>
          <img src={photo} alt="Product" />
          <p>{name}</p>
          {stock > 0 ? (
            <span className="green">{stock} Available</span>
          ) : (
            <span className="red">Not Available</span>
          )}
          <h3>${price}</h3>
      </section>
<article>
<form onSubmit={SubmitHandaler}>
<h2>Manage</h2>

<div>
  <label> Name</label>
<input 
required
type="text"
placeholder = "Name"
value={nameUpdate}
onChange={(e)=>setNameUpdate(e.target.value)}
/>
</div>
<div>
  <label>price</label>
<input 
required
type="number"
placeholder = "price"
value={priceUpdate === 0 ? '' : priceUpdate}
min={0}
onChange={(e)=>setPriceUpdate(Number(e.target.value))}
/>
</div>
<div>
  <label>Stock</label>
<input 
required
type="number"
placeholder ="Stock"
value={stockUpdate === 0 ? '' : stockUpdate}
min={0}
onChange={(e)=>setStockUpdate(Number(e.target.value))}
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

{photoUpdate && <img  src={photoUpdate} alt='new Image'/>}

<button type='submit'>Update</button>

</form>
</article>






      </main>
      
      </div>
  )
}

export default ProductMangement