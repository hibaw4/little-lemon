import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useReducer } from "react";
import Nav from "./components/Nav";
import Homepage from "./components/Homepage";
import BookingPage from "./components/BookingPage";
import ConfirmedBooking from "./components/ConfirmedBooking";
import Footer from "./components/Footer";
import "./App.css";

// Initialize times function - uses the API
export const initializeTimes = () => {
  const today = new Date();
  const dateString = today.toISOString().split('T')[0];

  // Use API if available, otherwise fallback
  if (window.fetchAPI) {
    return window.fetchAPI(dateString);
  }
  return ["17:00", "18:00", "19:00", "20:00", "21:00"];
};

// Reducer function - uses the API
export const updateTimes = (state, action) => {
  switch (action.type) {
    case "DATE_CHANGED":
      if (window.fetchAPI && action.date) {
        return window.fetchAPI(action.date);
      }
      return ["17:00", "18:00", "19:00", "20:00", "21:00"];
    default:
      return state;
  }
};

function App() {
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    [],
    initializeTimes
  );

  return (
    <Router>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <header role="banner">
        <Nav />
      </header>

      <main id="main-content" role="main" tabIndex="-1">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/booking"
            element={
              <BookingPage
                availableTimes={availableTimes}
                dispatch={dispatch}
              />
            }
          />
          <Route path="/booking-confirmed" element={<ConfirmedBooking />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;