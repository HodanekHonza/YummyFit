"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class CalorieIntakeMongo extends UuObjectDao {
  async createSchema() {}
  async create(food) {
    return super.insertOne(food);
  }
  async get(calorieIntakeId) {
    const query = { _id: calorieIntakeId };
    return await super.findOne(query);
  }

  async list(date, uuIdentity) {
    return await super.find({
      creationDate: date,
      uuIdentity: uuIdentity,
    });
  }

  async delete(calorieIntakeId) {
    const query = { _id: calorieIntakeId };
    return await super.deleteOne(query);
  }
}

module.exports = CalorieIntakeMongo;
