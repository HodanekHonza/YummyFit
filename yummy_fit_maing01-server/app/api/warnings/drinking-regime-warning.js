const Errors = require("../errors/drinking-regime-error.js");

const Warnings = {
  DrinkingRegime: {
    UnsupportedKeys: {
      code: `${Errors.DrinkingRegime.UC_CODE}unsupportedKeys`,
    },
  },
};

module.exports = Warnings;


