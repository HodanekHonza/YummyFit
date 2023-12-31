"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const Errors = require("../api/errors/app-config-error.js");
const Warnings = require("../api/warnings/app-config-warning.js");

class AppConfigAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("app-config");
  }

  async create(dtoIn, session) {
    let uuAppErrorMap = {};
    //validation of dtoIn
    const validationResult = this.validator.validate("appConfigCreateItemDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.AppConfig.UnsupportedKeys.code,
      Errors.AppConfig.InvalidDtoIn
    );

    const uuIdentity = session.getIdentity().getUuIdentity();
    const uuIdentityName = session.getIdentity().getName();

    const list = await this.dao.create(dtoIn);

    const uuObject = {
      list,
      uuIdentity,
      uuIdentityName,
      uuAppErrorMap,
    };
    return uuObject;
  }

  async get(awid, dtoIn, session) {
    let uuAppErrorMap = {};

    //validation of dtoIn
    const validationResult = this.validator.validate("appConfigGetItemDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.AppConfig.UnsupportedKeys.code,
      Errors.AppConfig.InvalidDtoIn
    );

    // set visibility
    const uuIdentity = session.getIdentity().getUuIdentity();
    const uuIdentityName = session.getIdentity().getName();

    const list = await this.dao.get(dtoIn.category, dtoIn.id);

    if (!list) {
      throw new Errors.AppConfig.ActivityFoodAchivementDoesNotExist({ uuAppErrorMap });
    }
    const uuObject = {
      list,
      awid,
      uuIdentity,
      uuIdentityName,
    };
    return { uuObject, uuAppErrorMap };
  }

  async list(awid, dtoIn, session) {
    let uuAppErrorMap = {};

    //validation of dtoIn
    const validationResult = this.validator.validate("appConfigListsCategoryDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.AppConfig.UnsupportedKeys.code,
      Errors.AppConfig.InvalidDtoIn
    );

    // set visibility
    const uuIdentity = session.getIdentity().getUuIdentity();
    const uuIdentityName = session.getIdentity().getName();
    const list = await this.dao.list(dtoIn.category);

    const uuObject = {
      list,
      uuIdentity,
      uuIdentityName,
      awid,
      uuAppErrorMap,
    };

    return list;
  }
}

module.exports = new AppConfigAbl();
