const ObjectId = require("mongodb").ObjectID;
const { generateToken } = require("../../utils/jwt");
const { md5Hash } = require("../../utils/common");

const resolvers = {
  Mutation: {
    addUser: async (parent, args, { req, dataSources }) => {
      const { db } = dataSources;
      const usercol = db.collection("user");
      const companycol = db.collection("company");

      const { firstname, lastname, birthday, password, company } = args;
      try {
        const companyData = await companycol.findOne({
          _id: new ObjectId(company),
        });

        if (!companyData) {
          throw new Error("company not found");
        }
        const { _id: company_id, name } = companyData;

        const resp = await usercol.insertOne({
          firstname: firstname,
          lastname: lastname,
          birthday: birthday,
          password: md5Hash(password),
          company: company_id,
        });

        return {
          _id: resp.insertedId,
          firstname,
          lastname,
          birthday,
          password,
          company: {
            name: name,
          },
        };
      } catch (err) {
        throw new Error(err.message);
      }
    },

    loginUser: async (parent, args, { req, dataSources }) => {
      const { db } = dataSources;
      const { firstname, password } = args;
      const usercol = db.collection("user");
      try {
        const userData = await usercol.findOne({
          firstname: firstname,
          password: md5Hash(password),
        });

        if (userData) {
          const { _id } = userData;
          const token = generateToken({
            userId: _id,
          });
          return {
            token,
            userId: _id,
          };
        } else {
          throw new Error("user not found");
        }
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
};

module.exports = resolvers;
