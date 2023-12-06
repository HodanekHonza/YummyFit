"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
//const Errors = require("../api/errors/calorie-intake-error.js");

class CalorieIntakeAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("calorie-intake");
    this.appConfigDao = DaoFactory.getDao("app-config");
    this.userProfileDao = DaoFactory.getDao("user-profile");
  }

  async create(awid, dtoIn, session) {
    let uuErrorMap = {};
    const { category, itemId, uuIdentity, quantity } = dtoIn;

    if (!["food", "activity", "achievements"].includes(category)) {
      throw new Error("Invalid category name");
    }
    if (quantity <= 0) {
      throw new Error("Invalid quantity. Quantity must be greater than 0.");
    }

    const item = await this.appConfigDao.get(category, itemId);
    if (!item || !item.calorie) {
      throw new Error('Item not found or calorie information is missing');
    }

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const userProfile = await this.userProfileDao.get(uuIdentity);
    const todayEntry = userProfile.dailySummary.find(entry => {
      const entryDate = new Date(entry.date);
      entryDate.setUTCHours(0, 0, 0, 0);
      return entryDate.getTime() === today.getTime();
    });

    const totalCalories = item.calorie * quantity;

    let uuObject = {
        uuIdentity: uuIdentity,
        creationDate: today,
        idOdFood: itemId,
        amount: quantity,
        calories: totalCalories
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

    return { uuObject, uuErrorMap };
  }


  async get(awid, dtoIn, session) {}

  async update(awid, dtoIn, session) {
    let uuErrorMap = {};
  
    const { calorieIntakeId, uuIdentity } = dtoIn;
  
    // Fetch the existing calorie intake record
    const calorieIntakeRecord = await this.dao.get(calorieIntakeId);
    if (!calorieIntakeRecord) {
      throw new Error('Calorie intake record not found');
    }
  
    // Get the user's profile
    const userProfile = await this.userProfileDao.get(uuIdentity);
    if (!userProfile) {
      throw new Error('User profile not found');
    }
  
    // Adjust the user's daily summary by subtracting the calories
    const recordDate = new Date(calorieIntakeRecord.creationDate);
    recordDate.setUTCHours(0, 0, 0, 0);
  
    let recordEntryIndex = userProfile.dailySummary.findIndex(entry => {
      const entryDate = new Date(entry.date);
      entryDate.setUTCHours(0, 0, 0, 0);
      return entryDate.getTime() === recordDate.getTime();
    });
  
    if (recordEntryIndex !== -1) {
      const updatedCalories = Math.max(0, userProfile.dailySummary[recordEntryIndex].calories - calorieIntakeRecord.calories);
      const update = { $set: { [`dailySummary.${recordEntryIndex}.calories`]: updatedCalories } };
  
      // Update the user profile with the adjusted daily summary
      await this.userProfileDao.update(uuIdentity, {}, update);
    }
  
    // Delete the calorie intake record
    await this.dao.delete(calorieIntakeId);
  
    return { uuObject: null, uuErrorMap };
  }
}

module.exports = new CalorieIntakeAbl();
