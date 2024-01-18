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

    const item = await this.appConfigDao.get("food", dtoIn.id);
    if (!item || !item.calorie) {
      throw new Errors.CalorieIntake.ItemNotFound({ uuAppErrorMap });
    }

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const userProfile = await this.userProfileDao.get(uuIdentity);
    const todayEntry = userProfile.dailySummary.find((entry) => {
      const entryDate = new Date(entry.date);
      entryDate.setUTCHours(0, 0, 0, 0);
      return entryDate.getTime() === today.getTime();
    });

    //checking if user already has achievement record for the day
    const todayEntryachievements = userProfile.personalAchievements.find((entry) => {
      const entryDate = new Date(entry.date);
      entryDate.setUTCHours(0, 0, 0, 0);
      return entryDate.getTime() === today.getTime();
    });

    if (!todayEntryachievements) {
      //pushing entry for achi
      const newEntryAchi = { date: today };

      const updateAchi = {
        $push: { personalAchievements: newEntryAchi },
        $set: { personalAchievementsDaysCount: userProfile.personalAchievementsDaysCount + 1 },
      };

      await this.userProfileDao.update(uuIdentity, null, updateAchi);
    }

    const totalCalories = item.calorie * dtoIn.quantity;

    const uuObject = {
      uuIdentity: uuIdentity,
      creationDate: today,
      nameOfFood: item.name,
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
      //pushing entry for calories
      const newEntry = { date: today, calories: totalCalories };
      const update = { $push: { dailySummary: newEntry } };

      await this.userProfileDao.update(uuIdentity, null, update);
      await this.dao.create(uuObject);
    }

    return { uuObject, uuAppErrorMap };
  }

  async list(dtoIn, session) {
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
    const uuIdentity = session.getIdentity().getUuIdentity();

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const list = await this.dao.list(today, uuIdentity);
    return list;
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
      throw new Errors.CalorieIntake.IntakeRecordNotFound({ uuAppErrorMap });
    }

    const userProfile = await this.userProfileDao.get(uuIdentity);

    if (!userProfile) {
      throw new Errors.CalorieIntake.UserProfileNotFound({ uuAppErrorMap });
    }

    const recordDate = new Date(calorieIntakeRecord.creationDate);
    recordDate.setUTCHours(0, 0, 0, 0);

    // checking if record entry is in daily summary
    const recordEntryIndex = userProfile.dailySummary.findIndex((entry) => {
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
