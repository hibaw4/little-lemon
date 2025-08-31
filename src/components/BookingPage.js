import BookingForm from "./BookingForm";

function BookingPage({ availableTimes, dispatch }) {
  return (
    <div className="booking-page">
      <h2>Make a Reservation</h2>
      <p>Book your table at Little Lemon</p>
      <BookingForm availableTimes={availableTimes} dispatch={dispatch} />
    </div>
  );
}

export default BookingPage;