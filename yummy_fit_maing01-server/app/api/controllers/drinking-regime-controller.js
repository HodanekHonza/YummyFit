"use strict";
const DrinkingRegimeAbl = require("../../abl/drinking-regime-abl.js");

class DrinkingRegimeController {
  create(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();
    let session = ucEnv.getSession();
    return DrinkingRegimeAbl.create(dtoIn, session);
  }
}

module.exports = new DrinkingRegimeController();
