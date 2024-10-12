import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import './Cart.css';
import logo from '../assets/online-shop.png';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  // Calculate total amount
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = () => {
    if (isLoggedIn) {
      navigate('/checkout'); // Redirect to checkout if user is logged in
    } else {
      navigate('/login'); // Redirect to login if user is not logged in
    }
  };

  const handleBrowseProducts = () => {
    navigate('/products'); 
  };

  return (
    <div className="cart">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="cart-empty">
         
          <img src={logo} alt="Empty Cart Logo" className="cart-empty-logo" />
          <p>Your cart is empty.</p>
          {/* Browse Products Button */}
          <button onClick={handleBrowseProducts} className="browse-products-btn">
            Browse Products
          </button>
        </div>
      ) : ( 
        <div className="cart-items"> 
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
         
          <div className="cart-total">
            <h3>Total: ${totalAmount}</h3>
          </div>
          
          <button onClick={handleCheckout} className="checkout-btn">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
