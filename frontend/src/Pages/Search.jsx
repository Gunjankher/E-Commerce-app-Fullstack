import React, { useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useCategoriesQuery, useSearchProductsQuery } from '../redux/api/productApi'
import { server } from '../redux/store'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/reducer/cartReducer'
import toast from 'react-hot-toast'


function Search() {

     const {data:categoriesResponse, isLoading:loadingCategories, isError,error} = useCategoriesQuery()

     const dispatch = useDispatch()
 // console.log(`categoriresResponse` , categoriesResponse);


const [search,setSearch] = useState("")
const [sort,setSort] = useState("")
const [maxPrice,setMaxPrice] = useState(100000)
const[category,setCategory] = useState("")
const [page,setPage] = useState(1)

const {isLoading:productLoading, data:searchedData} = useSearchProductsQuery( {
  search,
  sort,
  category,
  page,
  price:maxPrice,
})



// console.log(`Searched Data`, searchedData);


 const isNextPage = true
 const isPreviousPage = true
const img = 'https://m.media-amazon.com/images/I/71jG+e7roXL._AC_UY218_.jpg'


const addToCartHandlar = (cartItem)=>{
  if(cartItem.stock<1)return toast.error("Out of Stock")
    dispatch(addToCart(cartItem))
  toast.success("added to cart")
  
    }
  


  return (
    <div className="product-search-page">
    <aside>
      <h2>Filters</h2>
      <div>
        <h4>Sort</h4>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">None</option>
          <option value="asc">Price (Low to High)</option>
          <option value="dsc">Price (High to Low)</option>
        </select>
      </div>

      <div>
        <h4>Max Price: {maxPrice || ""}</h4>
        <input
          type="range"
          min={100}
          max={100000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
      </div>

      <div>
        <h4>Category</h4>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">ALL</option>
      {
        loadingCategories === false&& categoriesResponse?.data?.map((i)=>(
          <option  key = {i}value={i}>{i.toUpperCase()}</option>
        ))
      }
        
        
        </select>
      </div>
    </aside>
    <main>
      <h1>Products</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

        <div className="search-product-list">
     {
      searchedData?.data[0]?.map((i)=>(
        <ProductCard
        key={i._id}
       productId={i._id}
       name={i.name}
       price={i.price}
       stock={i.stock}
       photo={ `${server}${i.photos?.[0].url}`}
handler={addToCartHandlar}
  
        />
      ))
     }
        </div>
{
  searchedData && searchedData.totalPage>1 &&(
    <article>
  <button
   onClick={()=>setPage((prev)=> prev-1)}
   disabled = {!isPreviousPage}
   >prev</button>
  <span>{page}of {searchedData.totalPage}</span>
  <button 
  onClick={()=>setPage((prev)=> prev+1)}
  disabled = {!isNextPage}
  >next</button>
</article>
  )
}
    </main>
  </div>
  )
}

export default Search