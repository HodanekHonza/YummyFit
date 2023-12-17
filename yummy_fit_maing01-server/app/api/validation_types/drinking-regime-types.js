/* eslint-disable */
// create drinking regime (POST)
const drinkingRegimeCreateDtoInType = shape({
  waterAmount: integer(1,2000).isRequired(),
});
