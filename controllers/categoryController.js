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

const addNewCategory = async (req, res, next) => {
  try {
    const { body } = req;
    const { title, description, category_id } = body;
    const sql = 'insert into category set ?';
    const data = await makeQuery(sql, { title, description, category_id });
    res.status(201).send(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export { getAllCategories, getCategoryById, addNewCategory };
