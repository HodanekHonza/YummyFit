"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const Errors = require("../api/errors/app-config-error.js");

class AppConfigAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("app-config");
  }

  async create(awid, dToIn, session) {}

  async get(awid, dtoIn, session) {}

  async list(awid, dtoIn, session) {} 
}

module.exports = new AppConfigAbl();
