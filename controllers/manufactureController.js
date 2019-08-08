import mysqlSelect from './mysqlController';
import AppError from '../errors/AppError';

export const getAllManufactures = async (req, res, next) => {
  try {
    mysqlSelect(res, 'select * from manufacture');
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export const getManufactureById = async (req, res, next) => {
  try {
    mysqlSelect(res, `select * from manufacture where id=${req.params.id}`);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};
