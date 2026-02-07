import Navbar from "../../Navbar/Navbar"
import Footer from "../../Footer/Footer"
import "./About.css"

const About = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="about-content">
        <div className="about-header">
          <h1>About Saloon Booking</h1>
          <p>Your trusted partner for beauty and grooming services</p>
        </div>

        <div className="about-section">
          <h2>Our Story</h2>
          <p>Founded in 2026, Saloon Booking was created with a simple mission: to make beauty and grooming services accessible to everyone. We connect customers with the best salons in their area, making it easy to book appointments anytime, anywhere.</p>
        </div>

        <div className="about-section">
          <h2>Our Mission</h2>
          <p>We strive to provide a seamless booking experience for both customers and salon owners. Our platform ensures that you can find and book the perfect beauty services with just a few clicks.</p>
        </div>

        <div className="about-section">
          <h2>Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Easy Booking</h3>
              <p>Book appointments in seconds with our user-friendly interface</p>
            </div>
            <div className="feature-card">
              <h3>Verified Salons</h3>
              <p>All our partner salons are verified and reviewed by real customers</p>
            </div>
            <div className="feature-card">
              <h3>24/7 Support</h3>
              <p>Our customer support team is always here to help you</p>
            </div>
            <div className="feature-card">
              <h3>Best Prices</h3>
              <p>Get competitive prices and exclusive deals from top salons</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Our Team</h2>
          <p>We are a team of passionate individuals dedicated to revolutionizing the beauty industry. From developers to customer service experts, everyone at Saloon Booking is committed to providing you with the best experience possible.</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About