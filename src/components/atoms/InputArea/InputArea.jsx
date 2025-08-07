import React from 'react';
import './InputArea.css';

const InputArea = ({ value, onChange, placeholder }) => (
    <textarea
        className="input-textarea"
        rows={4}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
    ></textarea>
);

export default InputArea;
