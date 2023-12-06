"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class UserProfileMongo extends UuObjectDao {
  async createSchema() {}

  async create(user) {
    return super.insertOne(user);
  }

  async get(uuIdentity) {
    const query = { uuIdentity: uuIdentity };

    return await super.findOne(query);
  }

  async update(uuIdentity, filter, update) {
    const baseQuery = { uuIdentity: uuIdentity };

    const query = filter ? { ...baseQuery, ...filter } : baseQuery;

    const options = { returnOriginal: false };
    return await super.findOneAndUpdate(query, update, options);
  }
}

module.exports = UserProfileMongo;
