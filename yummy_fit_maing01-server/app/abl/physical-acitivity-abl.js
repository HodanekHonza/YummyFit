"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const Errors = require("../api/errors/physical-activity-error.js");

class PhysicalActivityAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("physical-activity");
  }
}

module.exports = new PhysicalActivityAbl();