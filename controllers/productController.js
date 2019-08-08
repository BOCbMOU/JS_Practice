import mysqlSelect from './mysqlController';
import AppError from '../errors/AppError';

const getAllProducts = async (req, res, next) => {
  try {
    mysqlSelect(res, 'select * from product_card');
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const getProductById = async (req, res, next) => {
  try {
    mysqlSelect(res, `select * from product_card where id=${req.params.id}`);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export { getAllProducts, getProductById };
