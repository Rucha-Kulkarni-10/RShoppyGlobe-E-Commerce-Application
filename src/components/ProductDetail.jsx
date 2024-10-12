import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/reducers/cartSlice';
import Popup from './Popup'; 
import Spinner from './Loading'; 
import './ProductDetails.css';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        image: product.images[0],
      }));

      setPopupMessage(`${product.title} added to cart!`);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const closePopup = () => {
    setPopupMessage(null);
  };

  if (loading) {
    return <Spinner />; 
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!product) {
    return <div className="not-found">No product found.</div>;
  }

  return (
    <div className="product-detail">
      <div className="product-detail-content">
        <div className="image-container">
          <img src={product.images[0]} alt={product.title} />
        </div>
        <div className="product-info">
          <h2>{product.title}</h2>
          <p className="description">{product.description}</p>
          <p className="price">Price: ${product.price.toFixed(2)}</p>
          <p className="category">Category: {product.category}</p>
          <p className="brand">Brand: {product.brand}</p>
          <p className="stock">Stock: {product.stock}</p>
          <p className="rating">Rating: {product.rating}</p>

          <div className="button-group">
            <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
            <button onClick={handleBuyNow} className="buy-now-btn">Buy Now</button>
          </div>
        </div>
      </div>

      {popupMessage && <Popup message={popupMessage} onClose={closePopup} />}
    </div>
  );
};

export default ProductDetail;
