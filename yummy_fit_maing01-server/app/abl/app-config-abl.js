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

  async get(awid, dtoIn, session) {
    let uuAppErrorMap = {};

    // validation of dtoIn
    // const validationResult = this.validator.validate("shoppingListGetDtoInType", dtoIn);
    // uuAppErrorMap = ValidationHelper.processValidationResult(
    //   dtoIn,
    //   validationResult,
    //   uuAppErrorMap,
    //   Warnings.List.UnsupportedKeys.code,
    //   Errors.List.InvalidDtoIn
    // );

    // set visibility
    //const visibility = authorizationResult.getAuthorizedProfiles().includes("Executives");
    const uuIdentity = session.getIdentity().getUuIdentity();
    const uuIdentityName = session.getIdentity().getName();

    let list = await this.dao.get(dtoIn.category,dtoIn.id);


   // let foodItem = list.food.find((item) => item.id === dtoIn.id);
    // Check if the user is authorized to view the list
    // let isAuthorized = list.authorizedUsers.some((user) => user.userID === uuIdentity);
    // if (!isAuthorized) {
    //   // Add authorization error to uuAppErrorMap
    //   throw new Errors.List.UserNotAuthorized({ uuAppErrorMap });
    // }

    const uuObject = {
      list,
      awid,
      uuIdentity,
      uuIdentityName,
    };
    return { uuObject, uuAppErrorMap };
  }

  async list(awid, dtoIn, session) {
    
    let list = await this.dao.list(dtoIn.category);

    return { list }
  }
}

module.exports = new AppConfigAbl();
