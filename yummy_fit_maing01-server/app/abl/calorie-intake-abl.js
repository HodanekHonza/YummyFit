"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const Errors = require("../api/errors/calorie-intake-error.js");
const Warnings = require("../api/warnings/calorie-intake-warning.js");

class CalorieIntakeAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("calorie-intake");
    this.appConfigDao = DaoFactory.getDao("app-config");
    this.userProfileDao = DaoFactory.getDao("user-profile");
  }

  async create(dtoIn, session) {
    let uuAppErrorMap = {};
    // validation of dtoIn
    const validationResult = this.validator.validate("calorieIntakeCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.CalorieIntake.UnsupportedKeys.code,
      Errors.CalorieIntake.InvalidDtoIn
    );

    // get uuIdentity information
    const uuIdentity = session.getIdentity().getUuIdentity();

    if (dtoIn.quantity <= 0) {
      throw new Error("Invalid quantity. Quantity must be greater than 0.");
    }

    const item = await this.appConfigDao.get("food", dtoIn.id);
    if (!item || !item.calorie) {
      throw new Error("Item not found or calorie information is missing");
    }

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const userProfile = await this.userProfileDao.get(uuIdentity);
    const todayEntry = userProfile.dailySummary.find((entry) => {
      const entryDate = new Date(entry.date);
      entryDate.setUTCHours(0, 0, 0, 0);
      return entryDate.getTime() === today.getTime();
    });

    const totalCalories = item.calorie * dtoIn.quantity;

    let uuObject = {
      uuIdentity: uuIdentity,
      creationDate: today,
      idOdFood: dtoIn.id,
      amount: dtoIn.quantity,
      calories: totalCalories,
    };

    if (todayEntry) {
      const updatedCalories = (todayEntry.calories || 0) + totalCalories;
      const update = { $set: { "dailySummary.$.calories": updatedCalories } };
      const filter = { "dailySummary.date": today };

      await this.userProfileDao.update(uuIdentity, filter, update);
      await this.dao.create(uuObject);
    } else {
      const newEntry = { date: today, calories: totalCalories };
      const update = { $push: { dailySummary: newEntry } };

      await this.userProfileDao.update(uuIdentity, null, update);
      await this.dao.create(uuObject);
    }

    return { uuObject, uuAppErrorMap };
  }

  async list(dtoIn) {
    let uuAppErrorMap = {};
    // validation of dtoIn
    const validationResult = this.validator.validate("calorieIntakeListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.CalorieIntake.UnsupportedKeys.code,
      Errors.CalorieIntake.InvalidDtoIn
    );
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    let list = await this.dao.list(today);
    return { list, uuAppErrorMap };
  }

  async delete(dtoIn, session) {
    let uuAppErrorMap = {};
    // validation of dtoIn
    const validationResult = this.validator.validate("calorieIntakeDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.CalorieIntake.UnsupportedKeys.code,
      Errors.CalorieIntake.InvalidDtoIn
    );

    // get uuIdentity information
    const uuIdentity = session.getIdentity().getUuIdentity();

    const calorieIntakeRecord = await this.dao.get(dtoIn.id);
    if (!calorieIntakeRecord) {
      throw new Error("Calorie intake record not found");
    }

    const userProfile = await this.userProfileDao.get(uuIdentity);
    if (!userProfile) {
      throw new Error("User profile not found");
    }

    const recordDate = new Date(calorieIntakeRecord.creationDate);
    recordDate.setUTCHours(0, 0, 0, 0);

    let recordEntryIndex = userProfile.dailySummary.findIndex((entry) => {
      const entryDate = new Date(entry.date);
      entryDate.setUTCHours(0, 0, 0, 0);
      return entryDate.getTime() === recordDate.getTime();
    });

    if (recordEntryIndex !== -1) {
      // Directly subtract the calories from the calorie intake record
      const updatedCalories = userProfile.dailySummary[recordEntryIndex].calories - calorieIntakeRecord.calories;
      const update = { $set: { [`dailySummary.${recordEntryIndex}.calories`]: updatedCalories } };

      // Update the user profile with the adjusted daily summary
      await this.userProfileDao.update(uuIdentity, {}, update);
    }

    // Delete the calorie intake record
    await this.dao.delete(dtoIn.id);

    return { uuObject: null, uuAppErrorMap };
  }
}

module.exports = new CalorieIntakeAbl();
