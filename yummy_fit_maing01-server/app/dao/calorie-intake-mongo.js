"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class CalorieIntakeMongo extends UuObjectDao {
  async createSchema() {}
  async create(food) {
    return super.insertOne(food);
  }
}

module.exports = CalorieIntakeMongo;
