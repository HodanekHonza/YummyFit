"use strict";
const CalorieIntakeAbl = require("../../abl/calorie-intake-abl.js");

class CalorieIntakeController {
  
  create(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();
    let session = ucEnv.getSession();
    return CalorieIntakeAbl.create(dtoIn, session);
  }

  get(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();
    let session = ucEnv.getSession();
    return CalorieIntakeAbl.get(awid, dtoIn, session);
  }

  delete(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();
    let session = ucEnv.getSession();
    return CalorieIntakeAbl.delete(awid, dtoIn, session);
  }
}

module.exports = new CalorieIntakeController();
