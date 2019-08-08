import mysqlSelect from './mysqlController';
import AppError from '../errors/AppError';

const getAllComments = async (req, res, next) => {
  try {
    mysqlSelect(res, 'select * from comment');
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const getCommentById = async (req, res, next) => {
  try {
    mysqlSelect(res, `select * from comment where id=${req.params.id}`);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const getCommentsByProductId = async (req, res, next) => {
  try {
    mysqlSelect(res, `select * from comment where product_id=${req.params.productId}`);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const getCommentsByUserId = async (req, res, next) => {
  try {
    mysqlSelect(res, `select * from comment where user_id=${req.params.userId}`);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export { getAllComments, getCommentById, getCommentsByProductId, getCommentsByUserId };
