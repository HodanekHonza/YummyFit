"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
//const Errors = require("../api/errors/drinking-regime-error.js");

class DrinkingRegimeAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("drinking-regime");
    this.userProfileDao = DaoFactory.getDao("user-profile");
  }

  async create(awid, dtoIn, session) {
    let uuErrorMap = {};
    const { waterAmount, uuIdentity } = dtoIn;
    
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
      waterAmount: waterAmount
    };

    if (todayEntry) {
      const updatedWaterIntake = (todayEntry.waterIntake || 0) + waterAmount;
      const update = { $set: { "dailySummary.$.waterIntake": updatedWaterIntake } };
      const filter = { "dailySummary.date": today };

      await this.userProfileDao.update(uuIdentity, filter, update);
      await this.dao.create(uuObject);
    } else {
      const newEntry = { date: today, waterIntake: waterAmount };
      const update = { $push: { dailySummary: newEntry } };

      await this.userProfileDao.update(uuIdentity, null, update);
      await this.dao.create(uuObject);
    }

    return { uuObject, uuErrorMap };
  }

  async get() {}

  async update() {}
}

module.exports = new DrinkingRegimeAbl();
