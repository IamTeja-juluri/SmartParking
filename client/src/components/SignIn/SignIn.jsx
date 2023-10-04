import React, { useState } from 'react';
import './SignIn.css';
import { Link ,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../AuthContext/AuthenticationContext';

const SignIn = () => {

  const navigate = useNavigate(); 
  const {login} = useAuth();
  // Create state variables for the form fields
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://127.0.0.1:5000/api/v1/user/signin',formData);
      console.log('Authentication successful:', response.data.data);
      login();
      // Clear the form fields
      setFormData({
        email: '',
        password: '',
      });
      navigate('/');
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className="signin">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label style={{color:'wheat'}} htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label style={{color:'wheat'}} htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button style={{backgroundColor:'brown'}}type="submit">Sign In</button>
      </form>
      <p style={{color:'wheat'}}>Don't have an account? <Link style={{color:'wheat'}}to="/signup">Sign Up</Link></p>
    </div>
  );

};

export default SignIn;
