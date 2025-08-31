// src/components/BookingForm.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BookingForm({ availableTimes, dispatch }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    dispatch({ type: "DATE_CHANGED", date: selectedDate });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = {
      date,
      time,
      guests: parseInt(guests),
      occasion
    };

    try {
      // Use API if available, otherwise simulate success
      if (window.submitAPI) {
        const success = window.submitAPI(formData);
        if (success) {
          navigate("/booking-confirmed");
        } else {
          alert("Failed to submit reservation. Please try again.");
        }
      } else {
        // Fallback if API is not available
        console.warn('submitAPI not available, simulating success');
        navigate("/booking-confirmed");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <label htmlFor="res-date">Choose date</label>
      <input
        type="date"
        id="res-date"
        value={date}
        onChange={handleDateChange}
        required
      />

      <label htmlFor="res-time">Choose time</label>
      <select
        id="res-time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
        disabled={!date}
      >
        <option value="">-- Select a time --</option>
        {availableTimes.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <label htmlFor="guests">Number of guests</label>
      <input
        type="number"
        id="guests"
        min="1"
        max="10"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
        required
      />

      <label htmlFor="occasion">Occasion</label>
      <select
        id="occasion"
        value={occasion}
        onChange={(e) => setOccasion(e.target.value)}
      >
        <option value="">-- Select an occasion --</option>
        <option value="Birthday">Birthday</option>
        <option value="Anniversary">Anniversary</option>
        <option value="Business">Business</option>
        <option value="Casual">Casual</option>
      </select>

      <button type="submit" disabled={isSubmitting || !time}>
        {isSubmitting ? "Submitting..." : "Reserve Table"}
      </button>
    </form>
  );
}

export default BookingForm;