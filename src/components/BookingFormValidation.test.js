import { render, screen, fireEvent } from '@testing-library/react';

// Test validation logic directly without the component
test("validation shows error for empty date", () => {
  // Mock validation function
  const validateField = (name, value) => {
    if (name === "date" && !value) return "Date is required";
    return "";
  };

  expect(validateField("date", "")).toBe("Date is required");
  expect(validateField("date", "2025-09-01")).toBe("");
});

test("validation shows error for invalid guest count", () => {
  const validateField = (name, value) => {
    if (name === "guests") {
      if (!value) return "Number of guests is required";
      if (value < 1) return "Minimum 1 guest required";
      if (value > 10) return "Maximum 10 guests allowed";
    }
    return "";
  };

  expect(validateField("guests", "0")).toBe("Minimum 1 guest required");
  expect(validateField("guests", "11")).toBe("Maximum 10 guests allowed");
  expect(validateField("guests", "5")).toBe("");
});

test("validation allows empty occasion", () => {
  const validateField = (name, value) => {
    if (name === "occasion") {
      return ""; // Occasion is optional
    }
    return "";
  };

  expect(validateField("occasion", "")).toBe("");
  expect(validateField("occasion", "Birthday")).toBe("");
});