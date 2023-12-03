"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class UserProfileMongo extends UuObjectDao {
  async createSchema() {}
  async create(user) {
    return super.insertOne(user);
  }
}

module.exports = UserProfileMongo;
