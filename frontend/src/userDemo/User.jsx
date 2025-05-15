import React, { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../Api';
import 'bootstrap/dist/css/bootstrap.min.css';

const User = () => {
  const [formData, setFormData] = useState({
    userName: 'surya',
    email: 'surya@gmail.com',
    password: 'surya@gmail.com',
    confirmPassword: 'surya@gmail.com'
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
    setMessage({ type: '', text: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.userName.trim()) newErrors.userName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert('jj')
    // const validationErrors = validate();
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }
    console.log(formData)
    axios.post(`${BASE_URL}/user/login`, formData)
      .then((response) => {
        console.log('User registered successfully:', response.data);
        setMessage({ type: 'success', text: 'User registered successfully!' });
        setFormData({ userName: '', email: '', password: '', confirmPassword: '' });
      })
      .catch((error) => {
        console.error('Registration error:', error.response?.data || error.message);
        setMessage({ type: 'danger', text: 'Registration failed. Please try again.' });
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4 w-100" style={{ maxWidth: '500px' }}>
        <h3 className="text-center mb-4">Login</h3>

        {message.text && (
          <div className={`alert alert-${message.type}`} role="alert">
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">User Name</label>
            <input
              type="text"
              className={`form-control ${errors.userName ? 'is-invalid' : ''}`}
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
            {errors.userName && <div className="invalid-feedback">{errors.userName}</div>}
          </div>

          

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          

          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>

        <div className="mt-3 text-center">
          <small className="text-muted">Forgot password</small>
        </div>
      </div>
    </div>
  );
};

export default User;
