import mysqlSelect from './mysqlController';
import AppError from '../errors/AppError';

export const getAllUsers = async (req, res, next) => {
  try {
    mysqlSelect(res, `select * from user`);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};
export const getUserById = async (req, res, next) => {
  try {
    mysqlSelect(res, `select * from user where id=${req.params.id}`);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};
