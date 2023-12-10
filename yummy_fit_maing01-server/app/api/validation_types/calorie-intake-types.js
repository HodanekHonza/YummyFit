/* eslint-disable */
// Create Calorie Intake (POST)
const calorieIntakeCreateDtoInType = shape({
  id: id().isRequired(),
  quantity: integer().isRequired(),
});

// Display Item from selected category (DELETE)
const calorieIntakeDeleteDtoInType = shape({
  id: id().isRequired(),
});
