
const express = require('express');
const app = express();
const logger =  require('./utils/logger');
const bodyParser = require('body-parser');
const { appConfig } = require('./config/environment');
const mongoConnecion = require('./db/mongo');
mongoConnecion.createConnection();

// Logging unhandled promises rejection
process.on('unhandledRejection', (reason, p) => {
  logger.error('Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});

app.use(require('cors')());
app.use(bodyParser.json());

app.use('/', require('./routes'));

app.listen(appConfig.PORT, () => {
  logger.debug(`Listening on port ${appConfig.PORT}`);
});
