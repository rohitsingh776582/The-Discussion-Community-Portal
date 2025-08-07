import React from 'react';
import './Button.css';
const Button = ({ label, onClick, type = 'button' }) => {
  return (
    <button className="btn" onClick={onClick} type={type}>
       {label} 
    </button>
  );
};
export default Button;
