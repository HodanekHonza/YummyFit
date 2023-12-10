"use strict";
const ShoppingListMainUseCaseError = require("./fit-main-use-case-error.js");

const DrinkingRegime = {
  UC_CODE: `${ShoppingListMainUseCaseError.ERROR_PREFIX}shoppingList/list/`,

  InvalidDtoIn: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DrinkingRegime.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ShoppingListDaoListFailed: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DrinkingRegime.UC_CODE}shoppingListDaoListFailed`;
      this.message = "Failed to list shopping lists.";
    }
  },
  UserNotAuthorized: class extends ShoppingListMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DrinkingRegime.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },
  ListDoesNotExist: class extends ShoppingListMainUseCaseError {
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
