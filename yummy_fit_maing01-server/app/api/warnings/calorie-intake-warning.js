const Errors = require("../errors/calorie-intake-error.js");

const Warnings = {
  CalorieIntake: {
    UnsupportedKeys: {
      code: `${Errors.CalorieIntake.UC_CODE}unsupportedKeys`,
    },
  },
};

module.exports = Warnings;


