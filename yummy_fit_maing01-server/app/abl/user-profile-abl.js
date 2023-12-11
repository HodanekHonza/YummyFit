"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const Errors = require("../api/errors/user-profile-error.js");
const Warnings = require("../api/warnings/user-profile-warning.js");

class UserProfileAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("user-profile");
  }

  async create(awid, dtoIn, session) {
    let uuAppErrorMap = {};
    // validation of dtoIn
    const validationResult = this.validator.validate("userProfileCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.UserProfile.UnsupportedKeys.code,
      Errors.UserProfile.InvalidDtoIn
    );

    // get uuIdentity information
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
    // validation of dtoIn
    const validationResult = this.validator.validate("userProfileGetDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.UserProfile.UnsupportedKeys.code,
      Errors.UserProfile.InvalidDtoIn
    );
    let list = await this.dao.get(dtoIn.uuIdentity);

    if (!list) {
      throw new Error("User Profile record not found");
    }

    return { list, uuAppErrorMap };
  }

  async delete() {}
}

module.exports = new UserProfileAbl();
