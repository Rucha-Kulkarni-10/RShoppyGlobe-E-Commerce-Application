import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/reducers/cartSlice';
import './ProductDetails.css'; 

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.thumbnail,
    }));
  };

  return (
    <div className="product-item">
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p className="price">${product.price}</p>
      <h5>{product.rating} &#9733;</h5>
      <p>
        {product.description.length > 100
          ? `${product.description.substring(0, 100)}...`
          : product.description}
      </p>

      <button onClick={handleAddToCart} className="add-to-cart-btn">
        Add to Cart
      </button>

      <Link to={`/product/${product.id}`} className="more-details-btn">
        More Details
      </Link>
    </div>
  );
};

export default ProductItem;
