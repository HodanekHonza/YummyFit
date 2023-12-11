"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const Errors = require("../api/errors/drinking-regime-error.js");
const Warnings = require("../api/warnings/drinking-regime-warning.js");

class DrinkingRegimeAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("drinking-regime");
    this.userProfileDao = DaoFactory.getDao("user-profile");
  }

  async create(dtoIn, session) {
    let uuAppErrorMap = {};
    // validation of dtoIn
    const validationResult = this.validator.validate("drinkingRegimeCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.DrinkingRegime.UnsupportedKeys.code,
      Errors.DrinkingRegime.InvalidDtoIn
    );

    // get uuIdentity information
    const uuIdentity = session.getIdentity().getUuIdentity();

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const userProfile = await this.userProfileDao.get(uuIdentity);
    const todayEntry = userProfile.dailySummary.find((entry) => {
      const entryDate = new Date(entry.date);
      entryDate.setUTCHours(0, 0, 0, 0);
      return entryDate.getTime() === today.getTime();
    });

    let uuObject = {
      uuIdentity: uuIdentity,
      creationDate: today,
      waterAmount: dtoIn.waterAmount,
    };

    if (todayEntry) {
      const updatedWaterIntake = (todayEntry.waterIntake || 0) + dtoIn.waterAmount;
      const update = { $set: { "dailySummary.$.waterIntake": updatedWaterIntake } };
      const filter = { "dailySummary.date": today };

      await this.userProfileDao.update(uuIdentity, filter, update);
      await this.dao.create(uuObject);
    } else {
      const newEntry = { date: today, waterIntake: dtoIn.waterAmount };
      const update = { $push: { dailySummary: newEntry } };

      await this.userProfileDao.update(uuIdentity, null, update);
      await this.dao.create(uuObject);
    }

    return { uuObject, uuAppErrorMap };
  }
}

module.exports = new DrinkingRegimeAbl();
