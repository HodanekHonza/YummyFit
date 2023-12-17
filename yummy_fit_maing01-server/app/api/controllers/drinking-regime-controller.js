"use strict";
const DrinkingRegimeAbl = require("../../abl/drinking-regime-abl.js");

class DrinkingRegimeController {
  create(ucEnv) {
    return DrinkingRegimeAbl.create(ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new DrinkingRegimeController();
