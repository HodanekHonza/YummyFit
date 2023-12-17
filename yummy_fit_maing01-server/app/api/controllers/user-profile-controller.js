"use strict";
const UserProfileAbl = require("../../abl/user-profile-abl.js");

class UserProfileController {
  create(ucEnv) {
    return UserProfileAbl.create(ucEnv.getDtoIn(), ucEnv.getSession());
  }

  get(ucEnv) {
    return UserProfileAbl.get(ucEnv.getDtoIn());
  }
}

module.exports = new UserProfileController();
