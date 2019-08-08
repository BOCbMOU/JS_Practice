import makeQuery from '../services/mysqlConnection';
import AppError from '../errors/AppError';

const getAllProducts = async (req, res, next) => {
  try {
    const sql = `select * from product_card`;
    const data = await makeQuery(sql);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const getProductById = async (req, res, next) => {
  try {
    const sql = `select * from product_card where id=?`;
    const data = await makeQuery(sql, req.params.id);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export { getAllProducts, getProductById };
