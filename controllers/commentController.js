import makeQuery from '../services/mysqlConnection';
import AppError from '../errors/AppError';

const getAllComments = async (req, res, next) => {
  try {
    const sql = `select * from comment`;
    const data = await makeQuery(sql);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const getCommentById = async (req, res, next) => {
  try {
    const sql = `select * from comment where id=?`;
    const data = await makeQuery(sql, req.params.id);
    res.json(data);
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
