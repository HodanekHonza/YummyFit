"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class AppConfigMongo extends UuObjectDao {
  async createSchema() {}
  async create(joke) {
    return super.insertOne(joke);
  }
}

module.exports = AppConfigMongo;
