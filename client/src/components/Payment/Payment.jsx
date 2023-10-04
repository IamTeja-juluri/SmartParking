import React, { useState } from 'react';
import './Payment.css';
import { useLocation,useNavigate } from 'react-router-dom';


const Payment = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location;

  const slot = new URLSearchParams(search).get('slot');
  console.log('slotcheck=',slot);
  const locationName = new URLSearchParams(search).get('location');
  console.log('locationcheck=',locationName);


  const [ownerName,setOwnerName] = useState('');
  const [vehicleNumber,setVehicleNumber] = useState('');
  const [duration,setDuration] = useState('');
  const [mobileNumber,setMobileNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCVC] = useState('');
  const [amount, setAmount] = useState(''); // New state for amount
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const handlePayment = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsPaymentSuccessful(true);
    setOwnerName('');
    setVehicleNumber('');
    setMobileNumber('');
    setDuration('');
    setCardNumber('');
    setExpiryDate('');
    setCVC('');
    setAmount('');
    await new Promise((resolve)=>setTimeout(resolve,5000));
    setIsPaymentSuccessful(false);
  };

  const onCancel = () => {
    navigate('/findParking')
  }

  return (
    <form>
    <div className="payment-component">
      <h3>Reserve Slot: {slot}</h3>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          placeholder="Enter your name"
          required
        />
      </div>
      <div>
        <label>Mobile Number:</label>
        <input
          type="text"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          placeholder="Enter your mobile number"
          required
        />
      </div>
      <div>
        <label>Vehicle Number:</label>
        <input
          type="text"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          placeholder="Enter your vehicle number"
          required
        />
      </div>
      <div>
        <label>Duration:</label>
        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Enter duration"
          required
        />
      </div>
      <div>
        <label>Card Number:</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          placeholder="1234 5678 9012 3456"
          required
        />
      </div>
      <div>
        <label>Expiry Date:</label>
        <input
          type="text"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          placeholder="MM/YY"
          required
        />
      </div>
      <div>
        <label>CVV:</label>
        <input
          type="text"
          value={cvc}
          onChange={(e) => setCVC(e.target.value)}
          placeholder="123"
          required
        />
      </div>
      <div>
        <label>Amount:</label>
        <input 
          type="text"
          value={amount}
          onChange={(e)=>setAmount(e.target.value)}
          placeholder="Enter Amount"
          required
          />
      </div>
      <button onClick={handlePayment}>Pay</button>
      {isPaymentSuccessful ? (
        <div className="payment-success">
          Payment successful! Your slot ({slot}) for the location ({locationName}) has been reserved.
        </div>
      ) : (
        <button onClick={onCancel}>Cancel Reservation</button>
      )}
    </div>
    </form>
  );
};

export default Payment;
