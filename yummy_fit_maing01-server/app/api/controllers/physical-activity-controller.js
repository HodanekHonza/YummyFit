"use strict";
const PhysicalActivityAbl = require("../../abl/physical-acitivity-abl.js");

class PhysicalActivityController {
  create(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();
    let session = ucEnv.getSession();
    return PhysicalActivityAbl.create(dtoIn, session);
  }

  list(ucEnv) {
    return PhysicalActivityAbl.list(ucEnv.getDtoIn());
  }

  delete(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();
    let session = ucEnv.getSession();
    return PhysicalActivityAbl.delete(dtoIn, session);
  }
}

module.exports = new PhysicalActivityController();
