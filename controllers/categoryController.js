import mysqlSelect from './mysqlController';
import AppError from '../errors/AppError';

const getAllCategories = async (req, res, next) => {
  try {
    mysqlSelect(res, 'select * from category');
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    mysqlSelect(res, `select * from category where id=${req.params.id}`);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export { getAllCategories, getCategoryById };
