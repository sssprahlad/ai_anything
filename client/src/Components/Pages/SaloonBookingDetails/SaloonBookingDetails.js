import React, { useState, useEffect } from 'react'
import './SaloonBookingDetails.css'
import Navbar from '../../Navbar/Navbar'
import { useContext } from 'react'
import { UserContext } from '../../../Context/Context'
import { GET_SALOON_BY_ID_URL, CREATE_BOOKING_URL, } from '../../../Constants/Constants'
import SnackbarPopup from "../../../Constants/Snackbar";


const SaloonBookingDetails = () => {

  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: ""
  });

  const { SaloonId, userId } = useContext(UserContext);
  const [saloonDetails, setSaloonDetails] = useState([]);
  console.log(userId, "userId");

  const [existingBookings, setExistingBookings] = useState([]);
  const [updatedBookings, setUpdatedBookings] = useState([]);
  const [loading, setLoading] = useState(false);


  console.log(SaloonId, saloonDetails);

  const [saloonBookingDetails, setSaloonBookingDetails] = useState({
    saloon_id: SaloonId,
    user_id: parseInt(localStorage.getItem("userId")),
    saloon_name: "",
    booking_date: new Date().toLocaleDateString('en-CA'),
    booking_time: "",
    customer_name: "",
    age: "",
    customer_phone: "",
  })

  useEffect(() => {
    if (SaloonId) {
      setSaloonBookingDetails(prev => ({
        ...prev,
        saloon_id: SaloonId,
        user_id: parseInt(localStorage.getItem("userId")) || null
      }));
    }
  }, [SaloonId]);
  // console.log(saloonTimings, " saloon timings");




  const fetchSaloonDetails = async () => {
    try {
     
      const response = await fetch(GET_SALOON_BY_ID_URL + SaloonId);
      const data = await response.json();
      setSaloonDetails(data?.saloon);

      if (data?.saloon?.name) {
        setSaloonBookingDetails(prev => ({
          ...prev,
          saloon_name: data.saloon.name
        }));
      }

      console.log(data);
    } catch (error) {
      console.error('Error fetching saloon details:', error);
      setSnackbar({
        open: true,
        message: "Error fetching saloon details",
        severity: "error"
      });
    } 
  }


  const fetchExistingBookings = async (saloonId) => {
    try {
      const response = await fetch(GET_SALOON_BY_ID_URL + saloonId + "/bookings");
      const data = await response.json();
      if (data.status === 200) {
        console.log(data);
        setSnackbar({
          open: true,
          message: "Bookings fetched successfully",
          severity: "success"
        });
        setExistingBookings(data?.bookings);
      }

    } catch (error) {
      console.error('Error fetching existing bookings:', error);
      setSnackbar({
        open: true,
        message: "Error fetching existing bookings",
        severity: "error"
      });
    }

  }


  useEffect(() => {
    fetchSaloonDetails()
    fetchExistingBookings(SaloonId)
  }, []) // SaloonId




  const saloonTypes = [
    { "id": "Men's Salon", "type": "Men's Salon" },
    { "id": "Women's Salon", "type": "Women's Salon" },
    { "id": "Unisex Salon", "type": "Unisex Salon" },
    { "id": "Beauty Salon", "type": "Beauty Salon" },
    { "id": "Bridal Makeup Salon", "type": "Bridal Makeup Salon" },
    { "id": "Hair Salon", "type": "Hair Salon" },
    { "id": "Nail Salon", "type": "Nail Salon" },
    { "id": "Spa & Salon", "type": "Spa & Salon" },
    { "id": "Luxury Salon", "type": "Luxury Salon" },
    { "id": "Kids Salon", "type": "Kids Salon" },
    { "id": "Grooming Lounge", "type": "Grooming Lounge" },
    { "id": "Organic / Herbal Salon", "type": "Organic / Herbal Salon" },
    { "id": "Ayurvedic Salon", "type": "Ayurvedic Salon" },
    { "id": "Mobile Salon", "type": "Mobile Salon" },
    { "id": "Pet Grooming Salon", "type": "Pet Grooming Salon" }
  ]

  const saloonTimings = [
    { id: 1, time: "9:00 AM - 10:00 AM" },
    { id: 2, time: "10:00 AM - 11:00 AM" },
    { id: 3, time: "11:00 AM - 12:00 PM" },
    { id: 4, time: "12:00 PM - 1:00 PM" },
    { id: 5, time: "1:00 PM - 2:00 PM" },
    { id: 6, time: "2:00 PM - 3:00 PM" },
    { id: 7, time: "3:00 PM - 4:00 PM" },
    { id: 8, time: "4:00 PM - 5:00 PM" },
    { id: 9, time: "5:00 PM - 6:00 PM" },
    { id: 10, time: "6:00 PM - 7:00 PM" },
    { id: 11, time: "7:00 PM - 8:00 PM" },
    { id: 12, time: "8:00 PM - 9:00 PM" },
    { id: 13, time: "9:00 PM - 10:00 PM" },
    { id: 14, time: "10:00 PM - 11:00 PM" },

  ]

  useEffect(() => {
    if (saloonBookingDetails?.booking_date && existingBookings?.length > 0) {
      const bookedSlots = new Set();

      existingBookings.forEach(booking => {
        if (booking.booking_date === saloonBookingDetails.booking_date) {
          bookedSlots.add(booking.booking_time);
        }
      });

      const updatedSlots = saloonTimings.map(timing => ({
        id: timing.id,
        time: timing.time,
        isBooked: bookedSlots.has(timing.time)
      }));

      setUpdatedBookings(updatedSlots);
    }else{
      setUpdatedBookings(saloonTimings);
    }
  }, [saloonBookingDetails?.booking_date, existingBookings, saloonTimings,SaloonId])


  const handleConfirmBooking = async () => {
    console.log(saloonBookingDetails);
    try {
      setLoading(true);
      const response = await fetch(CREATE_BOOKING_URL + SaloonId + "/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saloonBookingDetails),
      })
      const data = await response.json();
      if(data?.status === 200){
        setLoading(false);
        setSnackbar({
          open: true,
          message: "Booking created successfully",
          severity: "success"
        });
      }else{
        setSnackbar({
          open: true,
          message: data?.message,
          severity: "error"
        });
        setLoading(false);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      setSnackbar({
        open: true,
        message: "Booking creation failed",
        severity: "error"
      });
      setLoading(false);
    }
  }



  const handleChange = (e) => {
    setSaloonBookingDetails({
      ...saloonBookingDetails,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="home-container">
      <Navbar />
      <h1 style={{color:"#CEC3FD"}}>Saloon Booking Timings</h1>
      <div className='saloon-details-container'>
        <div className='saloon-details-left'>
          <p className='shop-name'>{saloonDetails?.name}</p>
          <p>{saloonDetails?.description}</p>
        </div>
        <div className='saloon-details-right'>
          <p>{saloonDetails?.phone}</p>
          <p>{saloonDetails?.address}</p>
          {/* <p>{saloonDetails?.timings}</p> */}
          <p>{saloonDetails?.email}</p>
        </div>

      </div>


      <div className='saloon-booking-row-container'>
        <div className='customer-details-container'>
          <h2>Customer Details</h2>
          <div className="sign-in-form">
            <label htmlFor="customerName" className="sign-in-label">Customer Name</label>
            <input id="customerName" placeholder="Enter customer name" className="sign-in-input" type="text" name="customer_name" onChange={handleChange} required />
          </div>
          <div className="sign-in-form">
            <label htmlFor="age" className="sign-in-label">Age</label>
            <input id="age" placeholder="Enter age" className="sign-in-input" type="number" name="age" onChange={handleChange} required />
          </div>

          <div className="sign-in-form">
            <label htmlFor="customerPhone" className="sign-in-label">Customer Phone</label>
            <input id="customerPhone" placeholder="Enter customer phone" className="sign-in-input" type="text" name="customer_phone" onChange={handleChange} required />
          </div>

          <div className="sign-in-form">
            <label htmlFor="bookingDate" className="sign-in-label">Booking Date</label>
            <input id="bookingDate" placeholder="Enter booking date" className="sign-in-input custom-date" type="date" value={saloonBookingDetails.booking_date} name="booking_date" onChange={handleChange} required />
          </div>

          <div className="sign-in-form">
            <label htmlFor="bookingTime" className="sign-in-label">Select Saloon Name</label>
            <select name="saloon_name" id="saloon_name" onChange={handleChange} className="time-slot-select">
              <option value="">Select saloon name</option>
              {saloonTypes.map((saloonType) => (
                <option key={saloonType.id} value={saloonType.id}>
                  {saloonType.type}
                </option>
              ))}

            </select>
          </div>

        </div>
        {/* <div className='saloon-type-container'>
          <h2>Saloon Type</h2>
          <select name="saloonType" id="saloonType" onChange={handleChange} className="time-slot-select">
            <option value="">Select saloon type</option>
            {saloonTypes.map((saloonType) => (
              <option key={saloonType.id} value={saloonType.id}>
                {saloonType.type}
              </option>
            ))}

          </select>

        </div> */}
        <div className='saloon-timings-container'>
          <h2>Available Time Slots</h2>
          {/* <select name="bookingTime" id="bookingTime" onChange={handleChange} className="time-slot-select">
            <option value="">Select a time slot</option>
            {saloonTimings.map((timeSlot) => (
              <option key={timeSlot.id} value={timeSlot.time}>
                {timeSlot.time}
              </option>
            ))}
          </select> */}
          <div className="time-slot-container">
            {updatedBookings?.map((timeSlot) => (
              <div
                key={timeSlot.id}
                className={timeSlot.isBooked ? "time-slot booked" : (selectedTimeSlot === timeSlot.id ? "time-slot selected" : "time-slot")}
                onClick={() => {!timeSlot.isBooked && setSelectedTimeSlot(timeSlot.id) ; setSaloonBookingDetails({ ...saloonBookingDetails, booking_time: timeSlot.time })}}    
              >
                {timeSlot.time}
              </div>
            ))}
          </div>
        </div>

      </div>
      <div className='confirm-booking-container'>
        <button onClick={handleConfirmBooking} >{loading ? <div className="spinner" style={{width: "30px", height: "30px"}}></div> : "Confirm Booking"}</button>
      </div>
      <SnackbarPopup open={snackbar.open} message={snackbar.message} severity={snackbar.severity} setSnackbar={setSnackbar} />

    </div>
  )
}

export default SaloonBookingDetails


