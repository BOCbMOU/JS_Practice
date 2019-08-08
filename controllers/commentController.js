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
    const { id } = req.params;
    const sql = `select * from comment where id=?`;
    const data = await makeQuery(sql, id);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const getCommentsByProductId = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const sql = `select * from comment where id=?`;
    const data = await makeQuery(sql, productId);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const getCommentsByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const sql = `select * from comment where id=?`;
    const data = await makeQuery(sql, userId);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export { getAllComments, getCommentById, getCommentsByProductId, getCommentsByUserId };
