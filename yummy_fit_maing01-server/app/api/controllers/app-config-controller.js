"use strict";
const AppConfigAbl = require("../../abl/app-config-abl.js");

class AppConfigController {
  create(ucEnv) {
    return AppConfigAbl.create(ucEnv.getDtoIn(), ucEnv.getSession());
  }
  get(ucEnv) {
    return AppConfigAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  list(ucEnv) {
    return AppConfigAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new AppConfigController();
