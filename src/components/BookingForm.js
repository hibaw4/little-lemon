import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BookingForm({ availableTimes, dispatch }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [occasion, setOccasion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case "date":
        if (!value) return "Date is required";
        if (new Date(value) < new Date().setHours(0, 0, 0, 0)) {
          return "Date cannot be in the past";
        }
        return "";

      case "time":
        if (!value) return "Time is required";
        if (!availableTimes.includes(value)) {
          return "Please select a valid time";
        }
        return "";

      case "guests":
        if (!value) return "Number of guests is required";
        if (value < 1) return "Minimum 1 guest required";
        if (value > 10) return "Maximum 10 guests allowed";
        return "";

      case "occasion":
        return ""; // Occasion is optional

      default:
        return "";
    }
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {
      date: validateField("date", date),
      time: validateField("time", time),
      guests: validateField("guests", guests),
      occasion: validateField("occasion", occasion),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  // Validate form on field changes
  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      validateForm();
    }
  }, [date, time, guests, occasion, touched]);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    setTouched(prev => ({ ...prev, date: true }));
    dispatch({ type: "DATE_CHANGED", date: selectedDate });
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
    setTouched(prev => ({ ...prev, time: true }));
  };

  const handleGuestsChange = (e) => {
    const value = e.target.value;
    setGuests(value);
    setTouched(prev => ({ ...prev, guests: true }));
  };

  const handleOccasionChange = (e) => {
    setOccasion(e.target.value);
    setTouched(prev => ({ ...prev, occasion: true }));
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched to show errors
    setTouched({
      date: true,
      time: true,
      guests: true,
      occasion: true,
    });

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

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

  // Check if form is valid for submit button
  const isFormValid = date && time && guests >= 1 && guests <= 10;

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate aria-labelledby="booking-form-title">
      <h2 id="booking-form-title" className="visually-hidden">Make a Reservation</h2>

      {/* Date Field */}
      <div className="form-field">
        <label htmlFor="res-date" id="date-label">
          Choose date <span className="required-asterisk" aria-hidden="true">*</span>
        </label>
        <input
          type="date"
          id="res-date"
          value={date}
          onChange={handleDateChange}
          onBlur={() => handleBlur("date")}
          min={new Date().toISOString().split('T')[0]}
          required
          aria-required="true"
          aria-labelledby="date-label"
          aria-describedby={touched.date && errors.date ? "date-error" : undefined}
          aria-invalid={touched.date && !!errors.date}
        />
        {touched.date && errors.date && (
          <span id="date-error" className="error-message" role="alert">{errors.date}</span>
        )}
      </div>

      {/* Time Field */}
      <div className="form-field">
        <label htmlFor="res-time" id="time-label">
          Choose time <span className="required-asterisk" aria-hidden="true">*</span>
        </label>
        <select
          id="res-time"
          value={time}
          onChange={handleTimeChange}
          onBlur={() => handleBlur("time")}
          required
          disabled={!date}
          aria-required="true"
          aria-labelledby="time-label"
          aria-describedby={touched.time && errors.time ? "time-error" : undefined}
          aria-invalid={touched.time && !!errors.time}
        >
          <option value="">-- Select a time --</option>
          {availableTimes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {touched.time && errors.time && (
          <span id="time-error" className="error-message" role="alert">{errors.time}</span>
        )}
      </div>

      {/* Guests Field */}
      <div className="form-field">
        <label htmlFor="guests" id="guests-label">
          Number of guests <span className="required-asterisk" aria-hidden="true">*</span>
        </label>
        <input
          type="number"
          id="guests"
          min="1"
          max="10"
          value={guests}
          onChange={handleGuestsChange}
          onBlur={() => handleBlur("guests")}
          required
          aria-required="true"
          aria-labelledby="guests-label"
          aria-describedby={touched.guests && errors.guests ? "guests-error" : undefined}
          aria-invalid={touched.guests && !!errors.guests}
        />
        {touched.guests && errors.guests && (
          <span id="guests-error" className="error-message" role="alert">{errors.guests}</span>
        )}
      </div>

      {/* Occasion Field */}
      <div className="form-field">
        <label htmlFor="occasion" id="occasion-label">
          Occasion (optional)
        </label>
        <select
          id="occasion"
          value={occasion}
          onChange={handleOccasionChange}
          onBlur={() => handleBlur("occasion")}
          aria-labelledby="occasion-label"
          aria-describedby={touched.occasion && errors.occasion ? "occasion-error" : undefined}
          aria-invalid={touched.occasion && !!errors.occasion}
        >
          <option value="">-- Select an occasion --</option>
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Business">Business</option>
          <option value="Casual">Casual</option>
        </select>
        {touched.occasion && errors.occasion && (
          <span id="occasion-error" className="error-message" role="alert">{errors.occasion}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !isFormValid}
        className={isSubmitting ? "submitting" : ""}
        aria-label="On Click: Submit reservation form"
        aria-busy={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Reserve Table"}
      </button>

      {!isFormValid && Object.keys(touched).length > 0 && (
        <p className="form-help" role="status">* Please fill in all required fields correctly</p>
      )}
    </form>
  );
}

export default BookingForm;