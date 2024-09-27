import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useLatestProductQuery } from '../redux/api/productApi'
import { addToCart } from '../redux/reducer/cartReducer'
import { server } from '../redux/store'



const img = 'https://m.media-amazon.com/images/I/71jG+e7roXL._AC_UY218_.jpg'

function Home () {

  const dispatch = useDispatch()

const {isLoading, error ,data} = useLatestProductQuery("")




  const addToCartHandlar = (cartItems)=>{
if(cartItems.stock<1)return toast.error("Out of Stock")
  dispatch(addToCart(cartItems))
toast.success("added to cart")

  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;
  if(error) toast.error("cannot Fetch the products")


  return (
    <div className='home'>

<section>
</section>
      <h1>latest Product
      <Link to="/search" className='findmore'>
      More
  </Link>
      </h1> 
      <main>

      {
  data?.data.length > 0 ? (
    data?.data.map((i) => {
      const imageUrl = `${server}${i.photos?.[0].url}`;

      return (
        <ProductCard
          key={i._id}
          productId={i._id}
          name={i.name}
          price={i.price}
          stock={i.stock}
          handler={addToCartHandlar}
          photo={imageUrl}  // Use the constructed image URL
        />
      );
    })
  ) : (
    <div>No products found</div>
  )
}
 
      






      </main>
    </div>
  )
}

export default Home




