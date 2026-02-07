import "./Footer.css"

const Footer = () => {
    return (
        <div className="footer-container">
            <footer className="footer-content">
                <div className="footer-section">
                    <h3>Saloon Booking</h3>
                    <p>Your trusted platform for beauty and grooming services</p>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Contact Info</h4>
                    <p>Email: info@saloonbooking.com</p>
                    <p>Phone: +1 234 567 8900</p>
                    <p>Address: 123 Beauty Street, NY 10001</p>
                </div>
                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-links">
                        <a href="/">Facebook</a>
                        <a href="/">Instagram</a>
                        <a href="/">Twitter</a>
                    </div>
                </div>
            </footer>
            <div className="footer-bottom">
                <p>&copy; 2026 Saloon Booking. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer
