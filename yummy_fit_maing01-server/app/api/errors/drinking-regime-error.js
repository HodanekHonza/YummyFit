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

  ShoppingListDaoListFailed: class extends FitMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DrinkingRegime.UC_CODE}shoppingListDaoListFailed`;
      this.message = "Failed to list shopping lists.";
    }
  },
  UserNotAuthorized: class extends FitMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DrinkingRegime.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },
  ListDoesNotExist: class extends FitMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DrinkingRegime.UC_CODE}ListDoesNotExist`;
      this.message = "List does not exist";
    }
  },
};

module.exports = {
  DrinkingRegime,
};
