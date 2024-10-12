import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/reducers/authSlice';
import { FaShoppingCart, FaStore } from 'react-icons/fa'; 
import './Header.css';
import logo from '../assets/online-shop.png'; 
const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  // Calculate the total number of items in the cart
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="navbar">
      {/* Use the image as the logo */}
      <Link to="/" className="navbar-logo">
        <img src={logo} alt="ShoppyGlobe Logo" className="store-logo" /> 
        ShoppyGlobe
      </Link>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/checkout">Checkout</Link>
        {isAuthenticated ? (
          <>
            <span>Welcome, {user?.username}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <Link to="/cart" className="cart-link">
          <FaShoppingCart className="cart-icon" />
          {totalItemsInCart > 0 && (
            <span className="cart-badge">{totalItemsInCart}</span>
          )}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
