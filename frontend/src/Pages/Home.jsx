import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useLatestProductQuery } from '../redux/api/productApi'


const img = 'https://m.media-amazon.com/images/I/71jG+e7roXL._AC_UY218_.jpg'

function Home() {

const {} = useLatestProductQuery("")



  const addToCartHandlar = ()=>{

  }

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
<ProductCard 
productId="sfsfsf"
name="Macbook"
price={45644}
stock={50}
handler={addToCartHandlar}
photo={img}

/>

      </main>
    </div>
  )
}

export default Home