"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class PhysicalActivityMongo extends UuObjectDao {
  async createSchema() {}
  async create(activity) {
    return super.insertOne(activity);
  }
}

module.exports = PhysicalActivityMongo;
