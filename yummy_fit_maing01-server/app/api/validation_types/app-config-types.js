/* eslint-disable */
// Display Item from selected category (GET)
const appConfigGetItemDtoInType = shape({
  id: id().isRequired(),
  category: oneOf(["food", "activity", "achievements"]),
});

// Display category List (LIST)
const appConfigListsCategoryDtoInType = shape({
  category: oneOf(["food", "activity", "achievements"]),
});

// Create Item (POST)
const appConfigCreateItemDtoInType = shape({
	category: oneOf(["food", "activity", "achievements"]),
  item: shape({
    name: string(1, 150).isRequired(),
    calorie: integer(1, 1000),
    length: integer(1, 1000),
    duration: integer(1, 1000),
  })
});
