import React, { useState } from 'react';
import useForm from '../../../hooks/useForm';
import { validateSignup } from '../../../utils/validation';
import InputField from '../../atoms/InputField/InputField';
import Button from '../../atoms/Button/Button';
import { Link } from 'react-router-dom';
import './AuthForm.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const initialValues = {
    name: '',
    email: '',
    password: ''
  };
  const onSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:4100/register', values);
      setMessage(res.data.message || 'Registration successful');
      setIsError(false);
      resetForm();
      setTimeout(() => {
        navigate('/login')
      }, 1000)
    } catch (error) {
      setMessage(error.response?.data?.message || 'Email already exists');
      setIsError(true)
    }
  };
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
  } = useForm(initialValues, validateSignup, onSubmit);
  return (
    <div className="profile-page-containe">
      <div className="signup-box">
        {/* Left Panel */}
        <div className="left-panel bg-blue-600">
          <p className="terms">
            By continuing you indicate that you agree to our{' '}
            <a href="#">Terms of Service</a> and{' '}
            <a href="#">Privacy Policy</a>.
          </p>
          <button className="social-btn google">
            <img src="https://img.icons8.com/color/16/google-logo.png" alt="Google" />
            Continue with Google
          </button>
          <button className="social-btn facebook">
            <img src="https://img.icons8.com/color/16/facebook-new.png" alt="Facebook" />
            Continue with Facebook
          </button>
          <p className="email-signup">Sign up with email</p>
        </div>
        {/* Right Panel */}
        <form className="auth-form right-panel" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          {/*  Message display */}
          {message && (
            <p className={isError ? "message error-message" : "message success-message"}>
              {message}
            </p>
          )}

          <InputField
            label="Full Name"
            type="text"
            name="name"
            id="name"
            placeholder="Your full name"
            value={values.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <InputField
            label="Email"
            type="email"
            name="email"
            id="email"
            placeholder="Your email"
            value={values.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <InputField
            label="Password"
            type="password"
            name="password"
            id="password"
            placeholder="Your password"
            value={values.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
           <Button type="submit" label="Register" /> 
          
          <p className='Link'> Already have an account? <Link to='/login'>Login</Link></p>
          
        </form>
      </div>
    </div>
  );
};
export default SignupForm;
