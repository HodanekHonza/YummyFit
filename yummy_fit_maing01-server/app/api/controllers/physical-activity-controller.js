"use strict";
const PhysicalActivityAbl = require("../../abl/physical-acitivity-abl.js");

class PhysicalActivityController {
  create(ucEnv) {
    return PhysicalActivityAbl.create(ucEnv.getDtoIn(), ucEnv.getSession());
  }
  delete(ucEnv) {
    return PhysicalActivityAbl.delete(ucEnv.getDtoIn(), ucEnv.getSession());
  }
  list(ucEnv) {
    return PhysicalActivityAbl.list(ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new PhysicalActivityController();
