const ObjectId = require("mongodb").ObjectID;
const { decodeToken } = require("../../utils/jwt");

const resolvers = {
  Query: {
    getUsers: async (parent, args, { req, dataSources }) => {
      const { db } = dataSources;
      const usercol = db.collection("user");
      try {
        const user = await usercol
          .aggregate([
            {
              $lookup: {
                from: "company",
                localField: "company",
                foreignField: "_id",
                as: "company",
              },
            },
            {
              $addFields: {
                company: { $arrayElemAt: ["$company", 0] },
              },
            },
          ])
          .toArray();

        if (user.length > 0) {
          return user;
        } else {
          throw new Error("data not found");
        }
      } catch (err) {
        throw new Error(err.message);
      }
    },
    getUser: async (parent, args, { req, dataSources }) => {
      const { db } = dataSources;
      const { usertoken } = args;
      const usercol = db.collection("user");

      try {
        const userTokenData = await decodeToken(usertoken);

        if (!userTokenData) {
          throw new Error("user token invalid");
        }

        const { userId } = userTokenData;

        const user = await usercol
          .aggregate([
            {
              $lookup: {
                from: "company",
                localField: "company",
                foreignField: "_id",
                as: "company",
              },
            },
            {
              $addFields: {
                company: { $arrayElemAt: ["$company", 0] },
              },
            },
            {
              $match: {
                _id: new ObjectId(userId),
              },
            },
          ])
          .toArray();

        if (user.length > 0) {
          return user[0];
        } else {
          throw new Error("data not found");
        }
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
};

module.exports = resolvers;
