import makeQuery from '../services/mysqlConnection';
import AppError from '../errors/AppError';

const getAllCategories = async (req, res, next) => {
  try {
    const sql = `select * from category`;
    const data = await makeQuery(sql);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sql = `select * from category where id=?`;
    const data = await makeQuery(sql, id);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export { getAllCategories, getCategoryById };
