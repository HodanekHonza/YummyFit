"use strict";
const CalorieIntakeAbl = require("../../abl/calorie-intake-abl.js");

class CalorieIntakeController {
  create(ucEnv) {
    return CalorieIntakeAbl.create(ucEnv.getDtoIn(), ucEnv.getSession());
  }

  list(ucEnv) {
    return CalorieIntakeAbl.list(ucEnv.getDtoIn());
  }

  delete(ucEnv) {
    return CalorieIntakeAbl.delete(ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new CalorieIntakeController();
