"use strict";
const FitMainUseCaseError = require("./fit-main-use-case-error.js");

const CalorieIntake = {
  UC_CODE: `${FitMainUseCaseError.ERROR_PREFIX}calorieIntake/list/`,

  InvalidDtoIn: class extends FitMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CalorieIntake.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ItemNotFound: class extends FitMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CalorieIntake.UC_CODE}ItemNotFound`;
      this.message = "Item not found";
    }
  },

  IntakeRecordNotFound: class extends FitMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CalorieIntake.UC_CODE}IntakeRecordNotFound`;
      this.message = "Intake record not found";
    }
  },

  UserProfileNotFound: class extends FitMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CalorieIntake.UC_CODE}UserProfileNotFound`;
      this.message = "User profile not found";
    }
  },

  ShoppingListDaoListFailed: class extends FitMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CalorieIntake.UC_CODE}calorieIntakeDaoListFailed`;
      this.message = "Failed to list shopping lists.";
    }
  },
  UserNotAuthorized: class extends FitMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CalorieIntake.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },
  ListDoesNotExist: class extends FitMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CalorieIntake.UC_CODE}ListDoesNotExist`;
      this.message = "List does not exist";
    }
  },
};

module.exports = {
  CalorieIntake,
};
