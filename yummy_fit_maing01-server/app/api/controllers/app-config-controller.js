"use strict";
const AppConfigAbl = require("../../abl/app-config-abl.js");

class AppConfigController {
  get(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();
    let session = ucEnv.getSession();
    return AppConfigAbl.get(awid, dtoIn, session);
  }

  list(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();
    let session = ucEnv.getSession();
    return AppConfigAbl.list(awid, dtoIn, session);
  }
}

module.exports = new AppConfigController();
