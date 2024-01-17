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

  async create(dtoIn, session) {
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
    const uuObject = {
      uuIdentity: uuIdentity,
      uuItedentityName: uuIdentityName,
      weight: dtoIn.weight,
      height: dtoIn.height,
      personalAchievementsDaysCount: 0,
      personalAchievements: [],
      dailySummary: [],
    };

    const list = await this.dao.create(uuObject);

    return { list, uuAppErrorMap };
  }

  async get(dtoIn, session) {
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
    const uuIdentity = session.getIdentity().getUuIdentity();
    const list = await this.dao.get(uuIdentity);

    if (!list) {
      throw new Errors.UserProfile.UserProfileNotFound({ uuAppErrorMap });
    }

    return { list, uuAppErrorMap };
  }

  async update(dtoIn, session) {
    let uuAppErrorMap = {};
    // validation of dtoIn
    // const validationResult = this.validator.validate("userProfileGetDtoInType", dtoIn);
    // uuAppErrorMap = ValidationHelper.processValidationResult(
    //   dtoIn,
    //   validationResult,
    //   uuAppErrorMap,
    //   Warnings.UserProfile.UnsupportedKeys.code,
    //   Errors.UserProfile.InvalidDtoIn
    // );
    const uuIdentity = session.getIdentity().getUuIdentity();
    //const userProfile = await this.userProfileDao.get(uuIdentity);
    const updateAchi = {
      $set: { weight: dtoIn.weight, height: dtoIn.height },
    };
    await this.dao.update(uuIdentity, null, updateAchi);
    const list = await this.dao.get(uuIdentity);
    const uuObject = { list };
    return uuObject;
  }
}

module.exports = new UserProfileAbl();
