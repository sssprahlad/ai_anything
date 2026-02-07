import Navbar from "../../Navbar/Navbar"
import Footer from "../../Footer/Footer"
import "./Contact.css"

const Contact = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="contact-content">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Get in touch with us anytime.</p>
        </div>

        <div className="contact-wrapper">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <div className="contact-item">
              <h3>Email</h3>
              <p>info@saloonbooking.com</p>
            </div>
            <div className="contact-item">
              <h3>Phone</h3>
              <p>+1 234 567 8900</p>
            </div>
            <div className="contact-item">
              <h3>Address</h3>
              <p>123 Beauty Street<br />New York, NY 10001<br />United States</p>
            </div>
            <div className="contact-item">
              <h3>Business Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          <div className="contact-form">
            <h2>Send us a Message</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input placeholder="Enter your name" type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input placeholder="Enter your email" type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input placeholder="Enter subject" type="text" id="subject" name="subject" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea placeholder="Enter your message" id="message" name="message" rows="5" required></textarea>
              </div>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contact
