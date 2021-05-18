const Mongo = require("mongodb");
const util = require("util");
const MongoClient = Mongo.MongoClient;

const url = util.format("mongodb://%s", process.env.DB_HOST);
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function Initdb() {
  return new Promise((resolve, reject) => {
    client
      .connect()
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = {
  Initdb,
};
