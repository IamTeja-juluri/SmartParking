import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import './Home.css'; 
import { useAuth } from '../../AuthContext/AuthenticationContext';

const Home = ({children}) => {

  const { isUserAuthenticated , logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout =()=> {
    logout();
    navigate('/signin');
  }

  return (
    <div className="home">
      <nav className="navbar">
        <div>
          <h1>
            <Link style={{color:'wheat'}} to="/">SmartParking.com</Link>
          </h1>
        </div>
        <ul>
          <li>
          <Link style={{color:'wheat'}} to="/findParking">Reserve Parking</Link>
          </li> 
          <li>
            <Link style={{color:'wheat'}} to="/services">Services</Link>
          </li>
          <li>
            <Link style={{color:'wheat'}} to="/contactUs">Contact Us</Link>
          </li>
          {!isUserAuthenticated ? (
            <> 
            <li> <Link style={{color:'wheat'}} to="/signin">Login</Link> </li>
            <li> <Link style={{color:'wheat'}} to="/signup">SignUp</Link> </li>
            </> 
          ) : (
            <li>
            <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
      <div className="header">
        {children}
      </div>
    </div>
  );
};

export default Home;
