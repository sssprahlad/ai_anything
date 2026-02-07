
import './App.css';
import SignIn from './Components/UsersDetails/SignIn/SignIn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Components/UsersDetails/SignUp/SignUp';
import ProtectedRouter from './ProtectedRoute/ProtectedRouter';
import Home from './Components/Pages/Home/Home';
import About from './Components/Pages/About/About';
import Contact from './Components/Pages/Contact/Contact';
import SaloonBookingDetails from './Components/Pages/SaloonBookingDetails/SaloonBookingDetails';
import { UserContextProvider } from './Context/Context';
import MyBookings from './Components/Pages/MyBookings/MyBookings';

function App() {
  return (
    <div className="App">
      <Router>
        <UserContextProvider>
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route element={<ProtectedRouter />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/saloon/:id" element={<SaloonBookingDetails />} />
              <Route path="/my-bookings" element={<MyBookings />} />
            </Route>
            {/* <Route path="/*" element={<ProtectedRouter/>} /> */}
          </Routes>
        </UserContextProvider>
      </Router>
    </div>
  );
}

export default App;

