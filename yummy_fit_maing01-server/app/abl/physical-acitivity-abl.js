"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const Errors = require("../api/errors/physical-activity-error.js");
const Warnings = require("../api/warnings/physical-activity-warning.js");

class PhysicalActivityAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("physical-activity");
    this.appConfigDao = DaoFactory.getDao("app-config");
    this.userProfileDao = DaoFactory.getDao("user-profile");
  }

  async create(dtoIn, session) {
    let uuAppErrorMap = {};
    // validation of dtoIn
    const validationResult = this.validator.validate("physicalActivityCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.PhysicalActivity.UnsupportedKeys.code,
      Errors.PhysicalActivity.InvalidDtoIn
    );

    // get uuIdentity information
    const uuIdentity = session.getIdentity().getUuIdentity();

    const activity = await this.appConfigDao.get("activity", dtoIn.id);

    if (!activity) {
      throw new Errors.PhysicalActivity.ActivityDoesNotExist({ uuAppErrorMap });
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

    const totalCalories = activity.calorie * dtoIn.duration;

    const uuObject = {
      uuIdentity: uuIdentity,
      creationDate: today,
      nameOfActivity: activity.name,
      idOfActivity: dtoIn.id,
      duration: dtoIn.duration,
      calories: totalCalories,
    };

    if (todayEntry) {
      const updatedCalories = (todayEntry.calories || 0) - totalCalories; // Assuming physical activity decreases the calorie count
      const update = { $set: { "dailySummary.$.calories": updatedCalories } };
      const filter = { "dailySummary.date": today };

      await this.userProfileDao.update(uuIdentity, filter, update);
      await this.dao.create(uuObject);
    } else {
      const newEntry = { date: today, calories: -totalCalories }; // Negative calories for physical activities
      const update = { $push: { dailySummary: newEntry } };

      await this.userProfileDao.update(uuIdentity, null, update);
      await this.dao.create(uuObject);
    }

    return { uuObject, uuAppErrorMap };
  }

  async delete(dtoIn, session) {
    let uuAppErrorMap = {};
    // validation of dtoIn
    const validationResult = this.validator.validate("physicalActivityDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.PhysicalActivity.UnsupportedKeys.code,
      Errors.PhysicalActivity.InvalidDtoIn
    );

    // get uuIdentity information
    const uuIdentity = session.getIdentity().getUuIdentity();

    const physicalActivityRecord = await this.dao.get(dtoIn.id);
    if (!physicalActivityRecord) {
      throw new Errors.PhysicalActivity.ActivityRecordDoesNotExist({ uuAppErrorMap });
    }

    const userProfile = await this.userProfileDao.get(uuIdentity);

    if (!userProfile) {
      throw new Errors.PhysicalActivity.UserProfileNotFound({ uuAppErrorMap });
    }

    const recordDate = new Date(physicalActivityRecord.creationDate);
    recordDate.setUTCHours(0, 0, 0, 0);

    const recordEntryIndex = userProfile.dailySummary.findIndex((entry) => {
      const entryDate = new Date(entry.date);
      entryDate.setUTCHours(0, 0, 0, 0);
      return entryDate.getTime() === recordDate.getTime();
    });

    if (recordEntryIndex !== -1) {
      const updatedCalories = userProfile.dailySummary[recordEntryIndex].calories + physicalActivityRecord.calories; // Adding back the subtracted calories
      const update = { $set: { [`dailySummary.${recordEntryIndex}.calories`]: updatedCalories } };

      await this.userProfileDao.update(uuIdentity, {}, update);
    }

    await this.dao.delete(dtoIn.id);

    return { uuObject: null, uuAppErrorMap };
  }
  async list(dtoIn) {
    let uuAppErrorMap = {};
    // validation of dtoIn
    const validationResult = this.validator.validate("physicalActivityListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      Warnings.PhysicalActivity.UnsupportedKeys.code,
      Errors.PhysicalActivity.InvalidDtoIn
    );
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const list = await this.dao.list(today);
    return list.itemList;
  }
}

module.exports = new PhysicalActivityAbl();
