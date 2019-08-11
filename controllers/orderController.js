import makeQuery from '../services/mysqlConnection';
import AppError from '../errors/AppError';

const getOrderFromDB = id => {
  const sql = `select * from orders where id=?`;
  return makeQuery(sql, id);
};

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

const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id === undefined) {
      return res.status(404).send('Did not get id');
    }

    const oldData = await getOrderFromDB(id);
    if (oldData.length === 0) {
      return res.status(404).send('Unknown id');
    }

    const { sum, userId } = req.body;
    const { created_at } = oldData;

    const sql = `update orders set ? where id = ${id}`;
    const newData = await makeQuery(sql, { sum, userId, created_at });

    res.status(202).send(newData);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getOrderFromDB(id);
    if (data.length === 0) {
      return res.status(404).send('Unknown id');
    }

    const sql = `delete from orders where id = ?`;
    await makeQuery(sql, id);

    res.status(202).send(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export { getAllOrders, getOrderById, addNewOrder, updateOrder, deleteOrder };
