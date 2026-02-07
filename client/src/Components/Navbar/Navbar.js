import "./Navbar.css"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        console.log("Logout clicked");
        if (window.confirm("Are you sure you want to logout?")) {
            localStorage.removeItem("token");
            navigate("/sign-in");
        }
    };

    // const toggleDropdown = () => {
    //     setShowDropdown(!showDropdown);
    // };

    // const fetchUserBookings = async () => {
    //     const userId = localStorage.getItem("userId");
    //     if (userId) {
    //         try {
    //             const response = await fetch(`${GET_BOOKINGS_URL}/${userId}`);
    //             const data = await response.json();
    //             if (data.status === 200) {
    //                 setBookings(data.bookings);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching bookings:', error);
    //         }
    //     }
    // };


    const handleMyBookingsClick = (userId) => {
        navigate("/my-bookings");
    }

    return (
        <div className="navbar-container">
            <nav className="nav-row">
                <div className="logo">
                    <h3 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>Saloon's</h3>
                </div>
                <ul className="nav-links">
                    <li><Link className={location.pathname === "/" ? "nav-item active" : "nav-item"} to="/">Home</Link></li>
                    <li><Link className={location.pathname === "/about" ? "nav-item active" : "nav-item"} to="/about">About</Link></li>
                    <li><Link className={location.pathname === "/contact" ? "nav-item active" : "nav-item"} to="/contact">Contact</Link></li>
                </ul>
                <div className="logout-container">
                    <div className="account-dropdown">
                        <button className="account-container" onClick={() => setShowDropdown(!showDropdown)}>{localStorage.getItem("name")?.slice(0, 1).toUpperCase() || "A"}</button>
                        {showDropdown && (
                            <div className="dropdown-menu">
                                <h4 style={{ color: "#E0E4EC" }} onClick={handleMyBookingsClick}>My Bookings</h4>

                            </div>
                        )}
                    </div>
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar

