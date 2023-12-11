/* eslint-disable */
// Create Calorie Intake (POST)
const calorieIntakeCreateDtoInType = shape({
  id: id().isRequired(),
  quantity: integer().isRequired(),
});

// List Calorie Intake (GET)
const calorieIntakeListDtoInType = shape({});

// Delete Calorie Intake (DELETE)
const calorieIntakeDeleteDtoInType = shape({
  id: id().isRequired(),
});
