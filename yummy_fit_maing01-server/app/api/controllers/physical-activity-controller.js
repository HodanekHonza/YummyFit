"use strict";
const PhysicalActivityAbl = require("../../abl/physical-acitivity-abl.js");

class PhysicalActivityController {
  
  create(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();
    let session = ucEnv.getSession();
    return PhysicalActivityAbl.create(awid, dtoIn, session);
  }

  get(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();
    let session = ucEnv.getSession();
    return PhysicalActivityAbl.get(awid, dtoIn, session);
  }

  update(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();
    let session = ucEnv.getSession();
    return PhysicalActivityAbl.update(awid, dtoIn, session);
  }
}

module.exports = new PhysicalActivityController();
