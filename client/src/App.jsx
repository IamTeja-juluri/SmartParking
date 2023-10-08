import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import ParkingAvailability from './components/Parking/Parking';
import Payment from './components/Payment/Payment';
import About from './components/About/About';
import ContactUs from './components/ContactUs/ContactUs';
import Services from './components/Services/Services';
import { useAuth } from './AuthContext/AuthenticationContext';


const App=  () => {

  const {isUserAuthenticated} = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home><About/></Home>} />
        <Route path="/services" element={<Home><Services/></Home>} />
        <Route path="/contactUs" element={<Home><ContactUs/></Home>}/>
        <Route path="/findParking" element={<Home><ParkingAvailability/></Home>} />
        {isUserAuthenticated ? (
          <>
          <Route path="/findParking/payment" element={<Home><Payment/></Home>} />
          </>
        ):(
          <>
          <Route path="/signup" element={<Home><SignUp/></Home>} />
          <Route path="/signin" element={<Home><SignIn/></Home>} />
          </>
        )}
      </Routes>
    </Router>
  )
}

export default App;
