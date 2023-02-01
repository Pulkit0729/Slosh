const dotenv = require("dotenv");
const createApp = require("./app");
dotenv.config();

const PORT = process.env.PORT || 3000;

require("./config/database");
const app = createApp();

app.listen(PORT, function () {
  console.log(`listening on port ${PORT}: http://localhost:${PORT}`);
});

module.export = app;
