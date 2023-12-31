"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;
const { ObjectId } = require("mongodb");
class AppConfigMongo extends UuObjectDao {
  async createSchema() {}

  async create(dtoIn) {
    // Predefined _id for the document to be updated
    const documentId = new ObjectId("659132f38ac21a628d6c5d39");

    // Current timestamp
    const currentTimestamp = new Date();

    // Find the document with the given _id
    const documentExists = await super.findOne({ _id: documentId });

    if (documentExists) {
      // Document exists, add the item to the specified category and update sys.mts and sys.rev
      await super.findOneAndUpdate(
        { _id: documentId },
        {
          $push: { [dtoIn.category]: { ...dtoIn.item, _id: new ObjectId() } },
        },
        { $set: { "sys.mts": currentTimestamp, "sys.rev": documentExists.sys.rev + 1 } }
      );
    } else {
      // Document doesn't exist, create it with the new item and initialize sys
      const newDocument = {
        _id: documentId,
        [dtoIn.category]: [{ ...dtoIn.item, _id: new ObjectId() }],
        sys: {
          cts: currentTimestamp,
          mts: currentTimestamp,
          rev: 1,
        },
      };
      await super.insertOne(newDocument);
    }
  }

  async get(category, itemId) {
    const objectId = new ObjectId(itemId);
    // Aggregation pipeline to find and extract the specific item from the given category
    const pipeline = [
      {
        $project: {
          item: {
            $filter: {
              input: `$${category}`,
              as: "item",
              cond: { $eq: ["$$item._id", objectId] },
            },
          },
        },
      },
    ];

    // Execute the aggregation pipeline
    const result = await super.aggregate(pipeline);
    if (!result || result.length === 0 || result[0].item.length === 0) {
      // Handle the case where the item is not found
      return null;
    }

    // Return the specific item
    return result[0].item[0];
  }

  async list(arrayName) {
    try {
      // Validate the arrayName to ensure it's a valid field
      if (!["food", "activity", "achievements"].includes(arrayName)) {
        throw new Error("Invalid array name");
      }

      // Aggregation pipeline to list all items from the specified array
      const pipeline = [
        { $project: { [arrayName]: 1 } }, // Dynamically select the specified array
        { $unwind: `$${arrayName}` }, // Deconstruct the specified array
        { $replaceRoot: { newRoot: `$${arrayName}` } }, // Make the items the root of the document
      ];

      // Execute the aggregation pipeline
      const result = await super.aggregate(pipeline);

      // Return the list of items from the specified array
      return result;
    } catch (error) {
      console.error("Error in list method:", error);
      throw error; // Rethrow the error for further handling if necessary
    }
  }
}

module.exports = AppConfigMongo;
