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

  async list(date) {
    return await super.find({
      creationDate: date,
    });
  }

  async delete(calorieIntakeId) {
    const query = { _id: calorieIntakeId };
    return await super.deleteOne(query);
  }
}

module.exports = CalorieIntakeMongo;
