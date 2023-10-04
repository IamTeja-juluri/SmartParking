import React, { useState } from 'react';
import './SignUp.css';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {

  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/v1/user/signup', formData);
      const user = response.data;
      console.log(user);
        setFormData({
          username: '',
          email: '',
          password: '',
        });
        navigate('/signin');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="signup">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label style={{color:'wheat'}} htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
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
        <button style={{backgroundColor:'brown'}} type="submit">Sign Up</button>
      </form>
      <p style={{color:'wheat'}}>Already have an account? <Link style={{color:'wheat'}} to="/signin">Sign In</Link></p>
    </div>
  );
};

export default SignUp;
