const resolvers = {
  Mutation: {
    addCompany: async (parent, args, { req, dataSources }) => {
      const { db } = dataSources;
      const { name, creationDate } = args;
      const companycol = db.collection("company");
      try {
        const resp = await companycol.insertOne({
          name: name,
          creationDate: creationDate,
        });

        return {
          _id: resp.insertedId,
          name,
          creationDate,
        };
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
};
module.exports = resolvers;
