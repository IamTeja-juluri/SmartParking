import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Parking.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthenticationContext';


const slotsArr = [
  { id: 1, name: 'Slot A' },
  { id: 2, name: 'Slot B' },
  { id: 3, name: 'Slot C' },
  { id: 4, name: 'Slot D' },
  { id: 5, name: 'Slot E' },
  { id: 6, name: 'Slot F' },
];

const locations = [
  { id: 1, name: 'Location A' },
  { id: 2, name: 'Location B' },
  { id: 3, name: 'Location C' },
];


const ParkingAvailability = () => {

  const { isUserAuthenticated } = useAuth();
  const navigate = useNavigate(); 


  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slotStatus, setSlotStatus] = useState({});
  const [showPayment, setShowPayment] = useState(false);

  const apiEndpoint = selectedLocation
  ? `https://blr1.blynk.cloud/external/api/get?token=55JPDAru2jmkxyuMC_gxOvgeIVAvFhIW&v0`
  : '';

  useEffect(() => {

    if (!selectedLocation) {
      return;
    }

    const fetchSlotStatus = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        const availabilityData = response.data;
        // Assuming availabilityData is either 0 or 1
        const slotAvailability = {};
        slotsArr.forEach((slot) => {
          slotAvailability[slot.id] = availabilityData === 0; // 0 means available (green)
        });
        setSlotStatus(slotAvailability);
        // Check if at least one slot is available to show the payment button
        if (Object.values(slotAvailability).some((available) => available)) {
          setShowPayment(true);
        }
      } catch (error) {
        console.error('Error fetching slot status:', error);
        const unavailableSlots = {};
        slotsArr.forEach((slot) => {
          unavailableSlots[slot.id] = false;
        });
        setSlotStatus(unavailableSlots);
      }
    };
    fetchSlotStatus();
  }, [apiEndpoint, selectedLocation]);

  const handleLocationChange = (event) => {
    const selectedLocationId = event.target.value;
    const location = locations.find((loc) => loc.id === parseInt(selectedLocationId));
    setSelectedLocation(location);
  };

  const handleSlotSelection = (slot) => {
    if (slotStatus[slot.id]) {
      setSelectedSlot(slot);
    } else {
      alert('Selected slot is unavailable');
    }
  };

  const handleReservation = () =>{
   
    const location = selectedLocation;
    const slot = selectedSlot
    const slotParts= slot.name.split(' ');
    const slotName=slotParts[1];
    navigate(`/findParking/payment?location=${location.name}&slot=${slotName}`);
  }

  const signInFirst = () => {
    navigate('/signin')
  }

  return (
    <div className="parking-availability">
      <h2>Parking Availability</h2>
      <div className="location-dropdown">
        <label htmlFor="locationSelect" style={{color:'wheat'}} >Select a Location:</label>
        <select
          id="locationSelect"
          value={selectedLocation ? selectedLocation.id.toString() : ''}
          onChange={handleLocationChange}
        >
          <option value="">Select a location</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </div>
      {selectedLocation && (
  <div>
    <h3 style={{color:'wheat'}}>Check Parking Availability for {selectedLocation.name}</h3>
    <div className="parking-layout">
      {/* Render the first row of slots */}
      <div className="parking-row">
        {slotsArr.slice(0, 3).map((slot) => (
          <div
            key={slot.id}
            className={`parking-slot ${slotStatus[slot.id] ? 'green' : 'red'}`}
            onClick={() => handleSlotSelection(slot)}
          >
            {slot.name}
          </div>
        ))}
      </div>
      
      {/* Render the second row of slots */}
      <div className="parking-row">
        {slotsArr.slice(3).map((slot) => (
          <div
            key={slot.id}
            className={`parking-slot ${slotStatus[slot.id] ? 'green' : 'red'}`}
            onClick={() => handleSlotSelection(slot)}
          >
            {slot.name}
          </div>
        ))}
      </div>
    </div>
    { isUserAuthenticated && showPayment  && (
      <>
      <button onClick={handleReservation}>Proceed Booking</button>
      </>
    )}
     { !isUserAuthenticated && showPayment  && (
      <>
      <button onClick={signInFirst}>Proceed Booking</button>
      </>
    )}

  </div>
)}
  </div>
  );
};

export default ParkingAvailability;