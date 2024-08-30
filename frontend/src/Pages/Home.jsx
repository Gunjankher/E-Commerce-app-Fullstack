import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useLatestProductQuery } from '../redux/api/productApi'
import toast from 'react-hot-toast'


const img = 'https://m.media-amazon.com/images/I/71jG+e7roXL._AC_UY218_.jpg'

function Home() {

const {isLoading, error ,data} = useLatestProductQuery("")




  const addToCartHandlar = ()=>{

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

      {data?.data.length > 0 ? (
          data?.data.map((i) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              name={i.name}
              price={i.price}
              stock={i.stock}
              handler={addToCartHandlar}
              photo={i.photos}
            />
          ))
        ) : (
          <div>No products found</div>
        )}

{
  data?.data?.forEach((i) => {
    console.log(`Product: ${i.name}, Photos:`, i.photos);
  })
  
}



      </main>
    </div>
  )
}

export default Home




