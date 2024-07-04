import React from 'react';
import { FaExpandAlt, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// import { transformImage } from '../utils/features';

const ProductCard = ({ productId, price, name, photo, stock, handler }) => {
    const server = "dgsdgsgsg"
  return (
    <div className="product-card">
     <img src={photo} />
     <p>{name}</p>
     <span>₹{price}</span>
<div>
    <button >
<FaPlus />
    </button>
</div>

    </div>
  );
};

export default ProductCard;
