const Errors = require("../errors/physical-activity-error.js");

const Warnings = {
  PhysicalActivity: {
    UnsupportedKeys: {
      code: `${Errors.PhysicalActivity.UC_CODE}unsupportedKeys`,
    },
  },
};

module.exports = Warnings;


