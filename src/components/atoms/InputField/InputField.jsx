
import React from 'react';
import './InputField.css';
const InputField = ({ label, id, ...props }) => {
  return (
    <div className="input-group">
      {label && <label htmlFor={id}>{label}</label>}
      <input className="input-field" id={id} {...props} />
    </div>
  );
};
export default InputField;
