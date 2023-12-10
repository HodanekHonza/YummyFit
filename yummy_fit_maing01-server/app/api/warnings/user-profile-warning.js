const Errors = require("../errors/user-profile-error.js");

const Warnings = {
  UserProfile: {
    UnsupportedKeys: {
      code: `${Errors.UserProfile.UC_CODE}unsupportedKeys`,
    },
  },
};

module.exports = Warnings;


