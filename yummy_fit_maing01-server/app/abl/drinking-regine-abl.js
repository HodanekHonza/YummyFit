"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const Errors = require("../api/errors/drinking-regime-error.js");

class DrinkingRegimeAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("drinking-regime");
  }
}

module.exports = new DrinkingRegimeAbl();
