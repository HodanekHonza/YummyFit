"use strict";
const UserProfileAbl = require("../../abl/user-profile-abl.js");

class UserProfileController {
  create(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();
    let session = ucEnv.getSession();
    return UserProfileAbl.create(awid, dtoIn, session);
  } 

  get(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();
    let session = ucEnv.getSession();
    return UserProfileAbl.get(awid, dtoIn, session);
  }

  delete(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();
    let session = ucEnv.getSession();
    return UserProfileAbl.delete(awid, dtoIn, session);
  }
}

module.exports = new UserProfileController();
