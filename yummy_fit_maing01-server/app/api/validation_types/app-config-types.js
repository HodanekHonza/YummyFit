/* eslint-disable */
// Display Item from selected category (GET)
const appConfigGetItemDtoInType = shape({
  id: id().isRequired(),
  category: string(1, 15).isRequired(),
});

// Display Shopping Lists (LIST)
const appConfigListsCategoryDtoInType = shape({
  category: string(1, 15).isRequired(),
});

