"use strict";
const FitMainUseCaseError = require("./fit-main-use-case-error.js");

const DrinkingRegime = {
  UC_CODE: `${FitMainUseCaseError.ERROR_PREFIX}drinkingRegime/`,

  InvalidDtoIn: class extends FitMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DrinkingRegime.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

module.exports = {
  DrinkingRegime,
};
