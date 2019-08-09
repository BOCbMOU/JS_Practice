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
    const { id } = req.params;
    const sql = `select * from orders where id=?`;
    const data = await makeQuery(sql, id);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const addNewOrder = async (req, res, next) => {
  try {
    const created_at = new Date();

    const { body } = req;
    const { sum, userId } = body;
    const sql = 'insert into orders set ?';
    const data = await makeQuery(sql, { sum, userId, created_at });
    res.status(201).send(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export { getAllOrders, getOrderById, addNewOrder };
