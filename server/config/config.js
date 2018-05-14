const env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  const { appConfig } = require('./environment.js');
  const envConfig = appConfig[env];

  Object.keys(envConfig).forEach((key) => {
    if(envConfig[key]){
      process.env[key] = envConfig[key];
    }
  });
}
