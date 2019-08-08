import makeQuery from '../services/mysqlConnection';
import AppError from '../errors/AppError';

const homeControllerAction = async (req, res, next) => {
  try {
    const sql = `select * from category`;
    const data = await makeQuery(sql);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export default homeControllerAction;
