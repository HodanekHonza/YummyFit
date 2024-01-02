/* eslint-disable */
// create physical activity (POST)
const userProfileCreateDtoInType = shape({
  weight: integer().isRequired(),
  height: integer().isRequired(),
});

const userProfileGetDtoInType = shape({});
