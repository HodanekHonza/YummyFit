"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
//const Errors = require("../api/errors/user-profile-error.js");

class UserProfileAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("user-profile");
  }

  async create() {}

  async get() {}

  async delete() {}
}

module.exports = new UserProfileAbl();
