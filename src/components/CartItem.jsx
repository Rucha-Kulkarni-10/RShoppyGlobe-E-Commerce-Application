import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/reducers/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  const handleIncrement = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      handleRemove(); 
    }
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} />
      <h3>{item.title}</h3>
      <p>Price: ${item.price.toFixed(2)}</p>

      <div className="quantity-control">
        <button onClick={handleDecrement} className="decrement-btn">-</button>
        <span className="quantity">{item.quantity}</span>
        <button onClick={handleIncrement} className="increment-btn">+</button>
      </div>

      <button onClick={handleRemove} className="remove-btn">Remove</button>
    </div>
  );
};

export default CartItem;
