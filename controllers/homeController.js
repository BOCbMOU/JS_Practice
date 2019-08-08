import mysqlSelect from './mysqlController';
import AppError from '../errors/AppError';

const homeControllerAction = async (req, res, next) => {
  try {
    /* const connection = mysql.createConnection({
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
    connection.end();// */
    mysqlSelect(res, 'select * from category');
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export default homeControllerAction;
