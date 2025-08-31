// src/components/ConfirmedBooking.js
import { Link } from "react-router-dom";

function ConfirmedBooking() {
  return (
    <div className="confirmed-booking">
      <div className="confirmation-content">
        <h2>Booking Confirmed! 🎉</h2>
        <p>Your reservation has been successfully submitted.</p>
        <p>We look forward to serving you at Little Lemon!</p>
        <Link to="/" className="back-home-btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default ConfirmedBooking;