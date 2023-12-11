/* eslint-disable */
// create physical activity (POST)
const physicalActivityCreateDtoInType = shape({
  id: id().isRequired(),
  duration: integer().isRequired(),
});

const physicalActivityDeleteDtoInType = shape({
  id: id().isRequired(),
});

const physicalActivityListDtoInType = shape({});
