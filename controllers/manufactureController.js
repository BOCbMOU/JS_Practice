import makeQuery from '../services/mysqlConnection';
import AppError from '../errors/AppError';

export const getAllManufactures = async (req, res, next) => {
  try {
    const sql = `select * from manufacture`;
    const data = await makeQuery(sql);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export const getManufactureById = async (req, res, next) => {
  try {
    const sql = `select * from manufacture where id=?`;
    const data = await makeQuery(sql, req.params.id);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};
