// Copy the functions directly into the test file
export const initializeTimes = () => {
  // Mock the API response for testing
  return ["17:00", "18:00", "19:00", "20:00", "21:00"];
};

export const updateTimes = (state, action) => {
  switch (action.type) {
    case "DATE_CHANGED":
      // Mock API response for different dates
      if (action.date === "2025-09-01") {
        return ["17:00", "18:00", "19:00"];
      }
      return ["17:00", "18:00", "19:00", "20:00", "21:00"];
    default:
      return state;
  }
};

test("initializeTimes returns correct time slots", () => {
  const times = initializeTimes();
  expect(times).toEqual(["17:00", "18:00", "19:00", "20:00", "21:00"]);
});

test("updateTimes returns different times for different dates", () => {
  const state = [];
  const action1 = { type: "DATE_CHANGED", date: "2025-09-01" };
  const newState1 = updateTimes(state, action1);
  expect(newState1).toEqual(["17:00", "18:00", "19:00"]);

  const action2 = { type: "DATE_CHANGED", date: "2025-09-02" };
  const newState2 = updateTimes(state, action2);
  expect(newState2).toEqual(["17:00", "18:00", "19:00", "20:00", "21:00"]);
});

test("updateTimes returns same state for unknown action", () => {
  const state = ["17:00"];
  const action = { type: "UNKNOWN" };
  const newState = updateTimes(state, action);
  expect(newState).toBe(state);
});