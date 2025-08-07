import React, { useState } from 'react';
import axios from 'axios';
import InputField from '../../atoms/InputField/InputField';
import Button from '../../atoms/Button/Button';
import { Link } from 'react-router-dom';
import './AuthForm.css';
import useForm from '../../../hooks/useForm';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:4100/login', formData, { withCredentials: true });
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setMessage('Login successful!');

      setTimeout(() => {
        if (user.role === 'admin') {
          navigate('/admin', { replace: true });
        } else {
          navigate('/home', { replace: true });
        }
      }, 1000);
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      setMessage(err.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  const { values, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    onSubmit
  );
  return (
    <div className="profile-page-containe">
      <div className="signup-box">
        {/* Left Panel with Image */}
        <div className="left-panel bg-500">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Login Visual"
            className="login-image"
          />
        </div>

        <form className="auth-form right-panel" onSubmit={handleSubmit}>
          <h2>Login</h2>

          {message && (
            <p className={`message ${message.includes('successful') ? 'success' : ''}`}>
              {message}
            </p>
          )}

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
          <Button type="submit" label={loading ? 'Logging in...' : 'Login'} disabled={loading} />

          <p className='Link'>Signup here <Link to='/'> Signup </Link> </p>

        </form>
      </div>
    </div>
  );
};

export default LoginForm;

