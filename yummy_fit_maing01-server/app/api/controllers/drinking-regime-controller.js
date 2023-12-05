"use strict";
const DrinkingRegimeAbl = require("../../abl/drinking-regime-abl.js");

class DrinkingRegimeController {
  
  create(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();
    let session = ucEnv.getSession();
    return DrinkingRegimeAbl.create(awid, dtoIn, session);
  }

  get(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();
    let session = ucEnv.getSession();
    return DrinkingRegimeAbl.get(awid, dtoIn, session);
  }

  update(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();
    let session = ucEnv.getSession();
    return DrinkingRegimeAbl.update(awid, dtoIn, session);
  }
}

module.exports = new DrinkingRegimeController();
