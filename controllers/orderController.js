import mysqlSelect from './mysqlController';
import AppError from '../errors/AppError';

const orderControllerAction = async (req, res, next) => {
  try {
    mysqlSelect(res, 'select * from order');
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export default orderControllerAction;
