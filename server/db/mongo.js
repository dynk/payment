const { appConfig } = require('../config/environment');
const mongoose = require('mongoose');


function createConnection() {
  const logger = require('../utils/logger').create(`Mongo:${appConfig.MONGODB_DATABASE_NAME}`);
  mongoose.Promise = Promise;
  const mongoPathConnection = buildMongoPath(appConfig);
  const options = buildOptions();
  return mongoose.connect(mongoPathConnection,options)
    .then(() => logger.info(`Connection to MONGODB ${appConfig.MONGODB_DATABASE_NAME} has been established successfully.`))
    .catch((err) => logger.error(`Unable to connect to the database MONGODB "${appConfig.MONGODB_DATABASE_NAME}": ${err}`));

}

function buildMongoPath(appConfig){
  let authURI;
  let mongoPathConnection = 'mongodb://';
  if(appConfig.MONGODB_USERNAME){
    authURI = `${encodeURIComponent(appConfig.MONGODB_USERNAME)}:${encodeURIComponent(appConfig.MONGODB_PASSWORD)}`;
  }
  if(authURI){
    mongoPathConnection += `${authURI}@`;
  }
  mongoPathConnection += `${appConfig.MONGODB_URI}:${appConfig.MONGODB_PORT}/${appConfig.MONGODB_DATABASE_NAME}`;
  return mongoPathConnection;
//   return 'mongodb://localhost/gust';
}

function buildOptions(){
  const result = {
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 5,
    authSource: 'admin'
  };
  return result;
}

module.exports = exports = {
  createConnection
};