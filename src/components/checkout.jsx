import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import './checkout.css'; 

const Checkout = () => {
  const { items } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  //form data
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    email: '',
    phone: '',
  });
  
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate(); 


  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  const calculateDiscount = () => {
    return (calculateTotal() * 0.05).toFixed(2);
  };

  const shippingCharges = 5.99;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    // Show popup msg when order is placed
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false); 
      navigate('/'); 
    }, 2000);
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>

      <div className="checkout-container">

        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          <h3>Shipping Information</h3>

          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            placeholder="Enter Your Full Name"
            onChange={handleInputChange}
            required
          />

          <textarea
            id="address"
            name="address"
            value={formData.address}
            placeholder="Enter Your Address"
            onChange={handleInputChange}
            required
          />

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter Your Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />

          <button type="submit" className="place-order-btn">Place Order</button>
        </form>


        <div className="order-summary">
          <h3>Order Summary</h3>

          {items.length === 0 ? (
            <p>No items in the cart</p>
          ) : (
            <div>
              <ul>
                {items.map((item) => (
                  <li key={item.id}>
                    {item.title} (x{item.quantity}) - ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
              <p>Total: ${calculateTotal()}</p>
              <p>Discount: -${calculateDiscount()}</p>
              <p>Shipping: ${shippingCharges.toFixed(2)}</p>
              <h3>Grand Total: ${(calculateTotal() - calculateDiscount() + shippingCharges).toFixed(2)}</h3>
            </div>
          )}
        </div>
      </div>

      {/* Show Popup when the order is placed */}
      {showPopup && (
        <div className="popup">
          <p>Your order has been placed successfully!</p>
        </div>
      )}
    </div>
  );
};

export default Checkout;
