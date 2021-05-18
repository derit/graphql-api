const app = require("./src/app");

const port = 9000;

app.listen(port, () => {
  console.log(`http listen to port ${port}`);
});
