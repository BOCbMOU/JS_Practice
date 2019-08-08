import makeQuery from '../services/mysqlConnection';
import AppError from '../errors/AppError';

const getAllOrders = async (req, res, next) => {
  try {
    const sql = `select * from orders`;
    const data = await makeQuery(sql);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const sql = `select * from orders where id=?`;
    const data = await makeQuery(sql, req.params.orderId);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export { getAllOrders, getOrderById };
