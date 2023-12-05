"use strict";
const FitMainAbl = require("../../abl/fit-main-abl.js");

class FitMainController {
  init(ucEnv) {
    return FitMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return FitMainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return FitMainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new FitMainController();
