import makeQuery from '../services/mysqlConnection';
import AppError from '../errors/AppError';

export const getAllUsers = async (req, res, next) => {
  try {
    const sql = `select * from user`;
    const data = await makeQuery(sql);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};
export const getUserById = async (req, res, next) => {
  try {
    const sql = `select * from user where id=?`;
    const data = await makeQuery(sql, req.params.id);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};
