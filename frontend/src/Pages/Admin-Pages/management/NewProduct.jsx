import React, { useState,useRef } from 'react'
import AdminSideBar from './../../../components/Admin-components/AdminSideBar'
import { useSelector } from 'react-redux'
import { useNewProductMutation } from '../../../redux/api/productApi'
import { useNavigate } from 'react-router-dom'
import { responseToast } from '../../../utilis/feature'
import { server } from '../../../redux/store'



function NewProduct() {
 
const {user} = useSelector((state)=>state.userReducer)
// console.log(`user`, user);


  const [name,setName] = useState("")
  const [price,setPrice] = useState(Number)
  const [stock,setStock] = useState(Number)
  const [photos,setPhotos] = useState()
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");




const [newProduct] = useNewProductMutation() 

const navigate = useNavigate()

  const changeImageHandler = (e)=>{
 const file = e.target.files?.[0]

const reader = new FileReader()

if(file){
  reader.readAsDataURL(file)
  reader.onloadend=()=>{
    if(typeof reader.result === "string") setPhotos(reader.result)
  }
} }




// const changeImageHandler = (e) => {
//   const file = e.target.files?.[0];
//   if (file) setPhoto(file);  // Store the file directly
// };


const submithandler = async (e) => {
  e.preventDefault();

  if (!name || !price || !stock || !category || !photos) return;

  const formData = new FormData();
  formData.set("name", name);
  formData.set("price", price.toString());
  formData.set("stock", stock.toString());
  formData.set("photos", photos); 
  formData.set("category", category);

  const res = await newProduct({
    id: user?._id,
    formData,
  });

  responseToast(res, navigate, "/admin/products");
};





  return (
    <div className='adminContainer'>
      <AdminSideBar />
      <main className='product-management'>

<article>
<form onSubmit={submithandler}>
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
              <label>Category</label>
              <input
                required
                type="text"
                placeholder="eg. laptop, camera etc"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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

{photos && <img  src={photos} alt='new Image'/>}

<button type='submit'>Create</button>

</form>
</article>



      </main>
      
      </div>
  )
}

export default NewProduct