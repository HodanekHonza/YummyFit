"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class AppConfigMongo extends UuObjectDao {
  async createSchema() {}

  async get(id) {
    return await super.findOne({ id });
  }

  async list(awid) {
    const filter = { awid };
    return await super.find(filter);
  }
}

module.exports = AppConfigMongo;
