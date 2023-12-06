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

  async create(awid, dtoIn, session) {
    let uuAppErrorMap = {};

    const uuIdentity = session.getIdentity().getUuIdentity();
    const uuIdentityName = session.getIdentity().getName();
    let uuObject = {
      uuIdentity: uuIdentity,
      uuItedentityName: uuIdentityName,
      weight: dtoIn.weight,
      height: dtoIn.height,
      personalAchievements: {
        dayUsingApp: 0,
      },
      dailySummary: [],
    };

    let list = await this.dao.create(uuObject);

    return { list, uuAppErrorMap };
  }

  async get(awid, dtoIn, session) {
    let uuAppErrorMap = {};
    let list = await this.dao.get(dtoIn.uuIdentity);
    return { list, uuAppErrorMap };
  }

  async delete() {}
}

module.exports = new UserProfileAbl();
