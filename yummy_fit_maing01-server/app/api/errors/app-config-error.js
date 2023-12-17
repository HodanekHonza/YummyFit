"use strict";
const FitMainUseCaseError = require("./fit-main-use-case-error.js");

const AppConfig = {
  UC_CODE: `${FitMainUseCaseError.ERROR_PREFIX}init/`,

  InvalidDtoIn: class extends FitMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AppConfig.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  ActivityFoodAchivementDoesNotExist: class extends FitMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AppConfig.UC_CODE}ActivityDoesNotExist`;
      this.message = "Activity, food or achivement does not exist";
    }
  },
};

module.exports = {
  AppConfig,
};
