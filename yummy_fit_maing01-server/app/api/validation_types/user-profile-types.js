/* eslint-disable */
// create physical activity (POST)
const userProfileCreateDtoInType = shape({
  weight: integer().isRequired(),
  height: integer().isRequired(),
});

const userProfileGetDtoInType = shape({
  uuIdentity: string(1, 25).isRequired(),
});
