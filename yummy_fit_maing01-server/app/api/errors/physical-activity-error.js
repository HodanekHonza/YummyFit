"use strict";
const FitMainUseCaseError = require("./fit-main-use-case-error.js");

const PhysicalActivity = {
  UC_CODE: `${FitMainUseCaseError.ERROR_PREFIX}physicalActivity/`,

  InvalidDtoIn: class extends FitMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${PhysicalActivity.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ActivityDoesNotExist: class extends FitMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${PhysicalActivity.UC_CODE}ActivityDoesNotExist`;
      this.message = "Activity does not exist";
    }
  },
  ActivityRecordDoesNotExist: class extends FitMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${PhysicalActivity.UC_CODE}ActivityRecordDoesNotExist`;
      this.message = "Activity Record does not exist";
    }
  },
  UserProfileNotFound: class extends FitMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UserProfile.UC_CODE}UserProfileNotFound`;
      this.message = "User profile not found";
    }
  },

  ShoppingListDaoListFailed: class extends FitMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${PhysicalActivity.UC_CODE}shoppingListDaoListFailed`;
      this.message = "Failed to list shopping lists.";
    }
  },
  UserNotAuthorized: class extends FitMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${PhysicalActivity.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },
  ListDoesNotExist: class extends FitMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${PhysicalActivity.UC_CODE}ListDoesNotExist`;
      this.message = "List does not exist";
    }
  },
};

module.exports = {
  PhysicalActivity,
};
