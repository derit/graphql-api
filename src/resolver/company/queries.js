const ObjectId = require("mongodb").ObjectID;

const resolvers = {
  Query: {
    getCompanyById: async (parent, args, { req, dataSources }) => {
      const { db } = dataSources;
      const { id } = args;
      const companycol = db.collection("company");
      try {
        const companyData = await companycol
          .aggregate([
            {
              $lookup: {
                from: "user",
                let: {
                  company_id: "$_id",
                },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$company", "$$company_id"],
                      },
                    },
                  },
                  {
                    $lookup: {
                      from: "company",
                      pipeline: [
                        {
                          $match: {
                            $expr: {
                              $eq: ["$_id", "$$company_id"],
                            },
                          },
                        },
                      ],
                      as: "company",
                    },
                  },
                  {
                    $addFields: {
                      company: { $arrayElemAt: ["$company", 0] },
                    },
                  },
                ],
                as: "users",
              },
            },
            {
              $match: {
                _id: new ObjectId(id),
              },
            },
          ])
          .toArray();

        if (companyData.length > 0) {
          return companyData[0];
        } else {
          throw new Error("data not found");
        }
      } catch (err) {
        throw new Error(err.message);
      }
    },
    getCompanies: async (parent, args, { req, dataSources }) => {
      const { db } = dataSources;
      const companycol = db.collection("company");
      try {
        const companyData = await companycol
          .aggregate([
            {
              $lookup: {
                from: "user",
                let: {
                  company_id: "$_id",
                },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$company", "$$company_id"],
                      },
                    },
                  },
                  {
                    $lookup: {
                      from: "company",
                      pipeline: [
                        {
                          $match: {
                            $expr: {
                              $eq: ["$_id", "$$company_id"],
                            },
                          },
                        },
                      ],
                      as: "company",
                    },
                  },
                  {
                    $addFields: {
                      company: { $arrayElemAt: ["$company", 0] },
                    },
                  },
                ],
                as: "users",
              },
            },
          ])
          .toArray();
        if (companyData.length > 0) {
          return companyData;
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
