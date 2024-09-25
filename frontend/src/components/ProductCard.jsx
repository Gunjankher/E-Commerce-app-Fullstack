import React from 'react';
import { FaExpandAlt, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { server } from '../redux/store';
// import { transformImage } from '../utils/features';


const ProductCard = ({ productId, price, name, photo, stock, handler }) => {
  // const imageUrl = photo && photo.length > 0 ? `${server}/${photo[0].url}` : 'https://via.placeholder.com/150';
 
  
  return (
    <div className="product-card">
     <img src={photo} />
     <p>{name}</p>
     <span>₹{price}</span>
<div>
    <button  
    onClick={()=> handler({productId,price,name,photo,stock,quantity :1})}
    >
<FaPlus />
    </button>
</div>

    </div>
  );
};

export default ProductCard;
