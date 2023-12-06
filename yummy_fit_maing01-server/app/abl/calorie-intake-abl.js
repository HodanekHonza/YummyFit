"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
//const Errors = require("../api/errors/calorie-intake-error.js");

class CalorieIntakeAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("calorie-intake");
    this.helperDao = DaoFactory.getDao("app-config");
  }

  async create(awid, dtoIn, session) {
    let list = await this.helperDao.get(dtoIn.id);

    return list
  }

  async get() {}

  async update() {}
}

module.exports = new CalorieIntakeAbl();
