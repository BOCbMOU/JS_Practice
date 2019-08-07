import mysqlSelect from './mysqlController';
import AppError from '../errors/AppError';

const productCardControllerAction = async (req, res, next) => {
  try {
    mysqlSelect(res, 'select * from product_card');
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export default productCardControllerAction;
