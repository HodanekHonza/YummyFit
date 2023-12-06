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
    // Base query to find the user profile
    const baseQuery = { uuIdentity: uuIdentity };

    // If a filter is provided (for updating a specific array element), combine it with the base query
    const query = filter ? { ...baseQuery, ...filter } : baseQuery;

    // Execute the update
    const options = { returnOriginal: false };
    return await super.findOneAndUpdate(query, update, options);
  }
}

module.exports = UserProfileMongo;
