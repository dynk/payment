const {UsersModel} = require('./../models/users');

const authenticate = (req, res, next) => {
  const token = req.header('x-auth');
  UsersModel.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }).catch((err) => {
    res.status(401).send(err);
  });
};

const isAdmin = (req, res, next) => {
  const token = req.header('x-auth');
  UsersModel.findByToken(token).then((user) => {
    if (!user || !user.isAdmin) {
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  }).catch((err) => {
    res.status(401).send(err);
  });
};

module.exports = {
  authenticate,
  isAdmin
};
