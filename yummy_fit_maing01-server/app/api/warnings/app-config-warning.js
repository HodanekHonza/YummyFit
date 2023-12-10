const Errors = require("../errors/app-config-error.js");

const Warnings = {
  AppConfig: {
    UnsupportedKeys: {
      code: `${Errors.AppConfig.UC_CODE}unsupportedKeys`,
    },
  },
};

module.exports = Warnings;



