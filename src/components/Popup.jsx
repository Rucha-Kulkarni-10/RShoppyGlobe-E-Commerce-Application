
import React, { useEffect } from 'react';
import './Popup.css'; 

const Popup = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); 
    }, 3000);

    return () => clearTimeout(timer); 
  }, [onClose]);

  return (
    <div className="popup">
      <p>{message}</p>
    </div>
  );
};

export default Popup;
