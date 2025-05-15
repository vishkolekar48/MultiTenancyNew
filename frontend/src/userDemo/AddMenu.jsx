import { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../Api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const AddMenu = () => {
  const [formData, setFormData] = useState({
   itemName: String,
  price: Number,
  category: String,
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const nevigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
    setSuccessMsg('');
    setErrorMsg('');
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.userName.trim()) newErrors.userName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios.post(`${BASE_URL}/user/register`, formData)
      .then((response) => {
        console.log('User registered successfully:', response.data);
        toast.success('User registered successfully!');
        setErrorMsg('');
        setFormData({
          userName: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
      })
      .catch((error) => {
        console.error('Error registering user:', error.response?.data || error.message);
        toast.error('User registration failed. Please try again.');
        setSuccessMsg('');
      });
  };
  const createAccount = () => {
    nevigate('/user'); // Assuming you have a route for login
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '450px' }}>
        <h3 className="text-center mb-4">Create an Account</h3>

        {successMsg && <div className="alert alert-success">{successMsg}</div>}
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
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
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
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

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-2">Register</button>

          <div>
            <p className="mt-3 text-center">Already have an account? <span className="text-primary" style={{ cursor: 'pointer' }} onClick={createAccount}>Login</span>
            </p>
          </div>
        </form>
      </div>
    </div>


  )
}

export default AddMenu