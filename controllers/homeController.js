import mysql from 'mysql';
import AppError from '../errors/AppError';

const logger = require('../utils/logger')('UserController');

const homeControllerAction = async (req, res, next) => {
  logger.log('info', `healthCheck: ${JSON.stringify(req.params)}`);
  try {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });
    connection.connect();
    connection.query('select * from user', null, (error, result) => {
      if (error) console.log(error);
      if (result) res.json(result);
    });
    connection.end();
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export default homeControllerAction;
