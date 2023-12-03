"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class DrinkingRegimeMongo extends UuObjectDao {
  async createSchema() {}
  async create(drink) {
    return super.insertOne(drink);
  }
}

module.exports = DrinkingRegimeMongo;
