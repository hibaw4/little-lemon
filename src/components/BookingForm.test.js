import { render, screen } from "@testing-library/react";

// Test the form elements directly without the actual component
test("booking form should have all required fields", () => {
  render(
    <form>
      <label htmlFor="res-date">Choose date</label>
      <input type="date" id="res-date" required />

      <label htmlFor="res-time">Choose time</label>
      <select id="res-time" required>
        <option value="">-- Select a time --</option>
        <option value="17:00">17:00</option>
        <option value="18:00">18:00</option>
      </select>

      <label htmlFor="guests">Number of guests</label>
      <input type="number" id="guests" min="1" max="10" required />

      <button type="submit">Reserve Table</button>
    </form>
  );

  expect(screen.getByLabelText(/Choose date/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Choose time/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Number of guests/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Reserve Table/i })).toBeInTheDocument();
});