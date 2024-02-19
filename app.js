require("./configs/loadEnvs");

const { successLog, separateLine } = require("./utils/chalk.log");
const config = require("./configs/config");
const { seed } = require("./initialData/initialDataService");
const { logger, fileSystemCheck } = require("./utils/logger");
const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("./public"));
app.use(require("cors")());

app.use((req, res, next) => logger(req, res, next));

// --- routes ---

app.use("/api/users", require("./routes/users.routes"));
app.use("/api/login", require("./routes/auth.routes"));
app.use("/api/cards", require("./routes/cards.routes"));
app.use("/api/companies", require("./routes/companies.routes"));
app.use("/api/categories", require("./routes/categories.routes"));
app.use("/api/departments", require("./routes/departments.routes"));
app.use("/api/locations", require("./routes/locations.routes"));
app.use("/api/workers", require("./routes/workers.routes"));

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});
// --------------

require("./db/dbService")
  .connect()
  .then(() => fileSystemCheck())
  // .then(() => seed().catch(() => {}))
  .then(() => {
    app.listen(config.app.port, () => {
      separateLine();
      successLog(`listening on port: ${config.app.port}`);
    });
  });
