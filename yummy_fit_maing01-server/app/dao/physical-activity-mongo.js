"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class PhysicalActivityMongo extends UuObjectDao {
  async createSchema() {}
  async create(activity) {
    return super.insertOne(activity);
  }
  async get(physicalActivityId) {
    const query = { _id: physicalActivityId };
    return await super.findOne(query);
  }
  async delete(physicalActivityId) {
    const query = { _id: physicalActivityId };
    return await super.deleteOne(query);
  }
}

module.exports = PhysicalActivityMongo;
