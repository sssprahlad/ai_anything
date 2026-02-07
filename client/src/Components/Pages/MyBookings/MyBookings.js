import Navbar from "../../Navbar/Navbar"
import "./MyBookings.css"
import { MY_BOOKINGS_URL, UPDATE_BOOKING_URL } from "../../../Constants/Constants"
import { useState, useEffect } from "react"


const MyBookings = () => {
    const [bookings, setBookings] = useState([])
    const [editBookingId, setEditBookingId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [updateBokkingDetails, setUpdateBokkingDetails] = useState({
        saloon_id: "",
        user_id: "",
        saloon_name: "",
        booking_date: "",
        booking_time: "",
        customer_name: "",
        age: "",
        customer_phone: "",
    })



    const fetchBookings = async () => {
        try {
            const response = await fetch(MY_BOOKINGS_URL + localStorage.getItem("userId") + "/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setBookings(data.myBookingsList);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    }

    useEffect(() => {
        fetchBookings()
        setUpdateBokkingDetails(prev => ({
            ...prev,
            user_id: parseInt(localStorage.getItem("userId")) || null
        }));
    }, [])



    const handleDeleteBooking = async (booking) => {
        if (window.confirm("Are you sure you want to delete this booking?")) {
            try {
                const response = await fetch(`${MY_BOOKINGS_URL}${booking.id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    fetchBookings();
                }
            } catch (error) {
                console.error('Error deleting booking:', error);
            }
        }
    }

    const handleEditBooking = (booking) => {
        setEditBookingId(booking.id);
        setUpdateBokkingDetails({
            saloon_id: booking.saloon_id,
            user_id: booking.user_id,
            saloon_name: booking.saloon_name,
            booking_date: booking.booking_date,
            booking_time: booking.booking_time,
            customer_name: booking.customer_name,
            age: booking.age,
            customer_phone: booking.customer_phone,
        });
    }

    const handleCancelEditBooking = () => {
        setEditBookingId(null);
    }

    const handleSaveBooking = async (booking) => {
        setLoading(true);
        try {
            const response = await fetch(`${UPDATE_BOOKING_URL}${booking.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateBokkingDetails),
            });
            if (response.ok) {
                setEditBookingId(null);
                fetchBookings();
            }
        } catch (error) {
            console.error('Error updating booking:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="home-container">
            <Navbar />
            <h1 style={{ color: "#CEC3FD" }}>My Bookings</h1>
            <div className="my-bookings-container">
                <table>
                    <thead style={{ textAlign: "left" }}>
                        <tr>
                            <th>saloonId</th>
                            <th>userId</th>
                            <th>saloonName</th>
                            <th>bookingDate</th>
                            <th>bookingTime</th>
                            <th>customerName</th>
                            <th>age</th>
                            <th>customerPhone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: "left" }}>
                        {bookings && bookings.length > 0 ? (
                            bookings.map(booking => (
                                <tr key={booking.id}>
                                    <td>
                                        <input
                                            type="text"
                                            style={{ background: "transparent" }}

                                            className={
                                                editBookingId === booking.id
                                                    ? "editable-input"
                                                    : "readonly-input"
                                            }
                                            readOnly={editBookingId !== booking.id}
                                            value={
                                                editBookingId === booking.id
                                                    ? updateBokkingDetails?.saloon_id || ""
                                                    : booking.saloon_id
                                            }
                                            onChange={(e) =>
                                                setUpdateBokkingDetails({
                                                    ...updateBokkingDetails,
                                                    saloon_id: e.target.value,
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            style={{ background: "transparent" }}
                                            disabled={editBookingId !== booking.id}
                                            className={
                                                editBookingId === booking.id
                                                    ? "editable-input"
                                                    : "readonly-input"
                                            }
                                            readOnly={editBookingId !== booking.id}
                                            value={
                                                editBookingId === booking.id
                                                    ? updateBokkingDetails?.user_id || ""
                                                    : booking.user_id
                                            }
                                            onChange={(e) =>
                                                setUpdateBokkingDetails({
                                                    ...updateBokkingDetails,
                                                    user_id: e.target.value,
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            style={{ background: "transparent" }}
                                            className={
                                                editBookingId === booking.id
                                                    ? "editable-input"
                                                    : "readonly-input"
                                            }
                                            readOnly={editBookingId !== booking.id}
                                            value={
                                                editBookingId === booking.id
                                                    ? updateBokkingDetails?.saloon_name || ""
                                                    : booking.saloon_name
                                            }
                                            onChange={(e) =>
                                                setUpdateBokkingDetails({
                                                    ...updateBokkingDetails,
                                                    saloon_name: e.target.value,
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            style={{ background: "transparent" }}
                                            className={
                                                editBookingId === booking.id
                                                    ? "editable-input"
                                                    : "readonly-input"
                                            }
                                            readOnly={editBookingId !== booking.id}
                                            value={
                                                editBookingId === booking.id
                                                    ? updateBokkingDetails?.booking_date || ""
                                                    : booking.booking_date
                                            }
                                            onChange={(e) =>
                                                setUpdateBokkingDetails({
                                                    ...updateBokkingDetails,
                                                    booking_date: e.target.value,
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            style={{ background: "transparent" }}
                                            className={
                                                editBookingId === booking.id
                                                    ? "editable-input"
                                                    : "readonly-input"
                                            }
                                            readOnly={editBookingId !== booking.id}
                                            value={
                                                editBookingId === booking.id
                                                    ? updateBokkingDetails?.booking_time || ""
                                                    : booking.booking_time
                                            }
                                            onChange={(e) =>
                                                setUpdateBokkingDetails({
                                                    ...updateBokkingDetails,
                                                    booking_time: e.target.value,
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            style={{ background: "transparent" }}
                                            className={
                                                editBookingId === booking.id
                                                    ? "editable-input"
                                                    : "readonly-input"
                                            }
                                            readOnly={editBookingId !== booking.id}
                                            value={
                                                editBookingId === booking.id
                                                    ? updateBokkingDetails?.customer_name || ""
                                                    : booking.customer_name
                                            }
                                            onChange={(e) =>
                                                setUpdateBokkingDetails({
                                                    ...updateBokkingDetails,
                                                    customer_name: e.target.value,
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            style={{ background: "transparent" }}
                                            className={
                                                editBookingId === booking.id
                                                    ? "editable-input"
                                                    : "readonly-input"
                                            }
                                            readOnly={editBookingId !== booking.id}
                                            value={
                                                editBookingId === booking.id
                                                    ? updateBokkingDetails?.age || ""
                                                    : booking.age
                                            }
                                            onChange={(e) =>
                                                setUpdateBokkingDetails({
                                                    ...updateBokkingDetails,
                                                    age: e.target.value,
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            style={{ background: "transparent" }}

                                            className={
                                                editBookingId === booking.id
                                                    ? "editable-input"
                                                    : "readonly-input"
                                            }
                                            readOnly={editBookingId !== booking.id}
                                            value={
                                                editBookingId === booking.id
                                                    ? updateBokkingDetails?.customer_phone || ""
                                                    : booking.customer_phone
                                            }
                                            onChange={(e) =>
                                                setUpdateBokkingDetails({
                                                    ...updateBokkingDetails,
                                                    customer_phone: e.target.value,
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        {editBookingId === booking.id ? (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: "0.5rem",
                                                    margin: "0 auto",
                                                    padding: "0px",
                                                }}
                                            >
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => handleSaveBooking(booking)}
                                                >
                                                    {loading ? (
                                                        <div className="spinner"></div>
                                                    ) : (
                                                        "Save"
                                                    )}
                                                </button>

                                                <button
                                                    className="btn btn-danger"
                                                    onClick={handleCancelEditBooking}
                                                >
                                                    Cancel
                                                </button>

                                            </div>
                                        ) : (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: "0.5rem",
                                                    margin: "0 auto",
                                                    padding: "0px",
                                                }}
                                            >

                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => handleEditBooking(booking)}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => handleDeleteBooking(booking)}
                                                >
                                                    Delete
                                                </button>

                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" style={{ textAlign: 'center', color: '#97A1B5' }}>
                                    No bookings found
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>

            </div>
        </div>
    )
}

export default MyBookings