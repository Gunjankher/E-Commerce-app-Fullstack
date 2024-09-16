import React,{useEffect, useState} from 'react'
import AdminSideBar from  './../../../components/Admin-components/AdminSideBar'
import { useSelector } from 'react-redux';
import { useProductDetailsQuery } from '../../../redux/api/productApi';
import { useParams } from 'react-router-dom';
import { server } from '../../../redux/store';



// const img =
//   "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";


function ProductMangement() {

  const {user} = useSelector((state)=>state.userReducer)

const params = useParams()
 
const {data} = useProductDetailsQuery(params.id)


  const [name,setName] = useState("")
  const [price,setPrice] = useState(0)
  const [stock,setStock] = useState(0)
  const [photo,setPhoto] = useState([])

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
  

useEffect(()=>{
  if(data?.data){
    setNameUpdate(data?.data?.name)
    setPriceUpdate(data?.data?.price)
    setStockUpdate(data?.data?.stock)
    setPhotoUpdate(data?.data?.photo)

  }


})


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
<strong>{}</strong>
          <img src={photoUpdate} alt="Product" />
          <p>{nameUpdate}</p>
          {stockUpdate > 0 ? (
            <span className="green">{stockUpdate} Available</span>
          ) : (
            <span className="red">Not Available</span>
          )}
          <h3>${priceUpdate}</h3>
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