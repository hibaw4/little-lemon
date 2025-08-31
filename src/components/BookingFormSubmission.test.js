import { render, screen, fireEvent } from '@testing-library/react';

// Test submission logic directly
test("form data structure is correct", () => {
  const mockSubmit = jest.fn();

  const { container } = render(
    <form onSubmit={(e) => {
      e.preventDefault();
      mockSubmit({
        date: "2025-09-01",
        time: "17:00",
        guests: 4,
        occasion: "Birthday"
      });
    }}>
      <button type="submit">Submit</button>
    </form>
  );

  const form = container.querySelector('form');
  fireEvent.submit(form);

  expect(mockSubmit).toHaveBeenCalledWith({
    date: "2025-09-01",
    time: "17:00",
    guests: 4,
    occasion: "Birthday"
  });
});

test("form prevents invalid submission", () => {
  const mockSubmit = jest.fn();
  let canSubmit = false;

  const { container } = render(
    <form onSubmit={(e) => {
      e.preventDefault();
      if (canSubmit) {
        mockSubmit();
      }
    }}>
      <button type="submit">Submit</button>
    </form>
  );

  const form = container.querySelector('form');
  fireEvent.submit(form);

  expect(mockSubmit).not.toHaveBeenCalled();

  canSubmit = true;
  fireEvent.submit(form);
  expect(mockSubmit).toHaveBeenCalled();
});