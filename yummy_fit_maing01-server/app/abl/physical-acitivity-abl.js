"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
//const Errors = require("../api/errors/physical-activity-error.js");

class PhysicalActivityAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("physical-activity");
    this.appConfigDao = DaoFactory.getDao("app-config");
    this.userProfileDao = DaoFactory.getDao("user-profile");
  }

  async create(awid, dtoIn, session) {
    let uuErrorMap = {};
    const { activityId, uuIdentity, duration } = dtoIn;

    const activity = await this.appConfigDao.get("activity", activityId);
    if (!activity || !activity.calorie) {
      throw new Error("Activity not found or calorie information is missing");
    }

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const userProfile = await this.userProfileDao.get(uuIdentity);
    const todayEntry = userProfile.dailySummary.find((entry) => {
      const entryDate = new Date(entry.date);
      entryDate.setUTCHours(0, 0, 0, 0);
      return entryDate.getTime() === today.getTime();
    });

    const totalCalories = activity.calorie * duration;

    let uuObject = {
      uuIdentity: uuIdentity,
      creationDate: today,
      idOfActivity: activityId,
      duration: duration,
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

    return { uuObject, uuErrorMap };
  }

  async delete(awid, dtoIn, session) {
    let uuErrorMap = {};

    const { physicalActivityId, uuIdentity } = dtoIn;

    const physicalActivityRecord = await this.dao.get(physicalActivityId);
    if (!physicalActivityRecord) {
      throw new Error("Physical activity record not found");
    }

    const userProfile = await this.userProfileDao.get(uuIdentity);
    const recordDate = new Date(physicalActivityRecord.creationDate);
    recordDate.setUTCHours(0, 0, 0, 0);

    let recordEntryIndex = userProfile.dailySummary.findIndex((entry) => {
      const entryDate = new Date(entry.date);
      entryDate.setUTCHours(0, 0, 0, 0);
      return entryDate.getTime() === recordDate.getTime();
    });

    if (recordEntryIndex !== -1) {
      const updatedCalories = userProfile.dailySummary[recordEntryIndex].calories + physicalActivityRecord.calories; // Adding back the subtracted calories
      const update = { $set: { [`dailySummary.${recordEntryIndex}.calories`]: updatedCalories } };

      await this.userProfileDao.update(uuIdentity, {}, update);
    }

    await this.dao.delete(physicalActivityId);

    return { uuObject: null, uuErrorMap };
  }
  async get() {}
}

module.exports = new PhysicalActivityAbl();
