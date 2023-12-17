/* eslint-disable */
// Display Item from selected category (GET)
const appConfigGetItemDtoInType = shape({
  id: id().isRequired(),
  category: string(1, 15).isRequired(),
});

// Display category List (LIST)
const appConfigListsCategoryDtoInType = shape({
  category: string(1, 15).isRequired(),
});

// Create Item (POST)
const appConfigCreateItemDtoInType = shape({
	category: string(1, 15).isRequired(),
});
