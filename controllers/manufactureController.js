import makeQuery from '../services/mysqlConnection';
import AppError from '../errors/AppError';

const getAllManufactures = async (req, res, next) => {
  try {
    const sql = `select * from manufacture`;
    const data = await makeQuery(sql);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const getManufactureById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sql = `select * from manufacture where id=?`;
    const data = await makeQuery(sql, id);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const addNewManufacture = async (req, res, next) => {
  try {
    const { body } = req;
    const { title, description, picture } = body;
    const sql = 'insert into manufacture set ?';
    const data = await makeQuery(sql, { title, description, picture });
    res.status(201).send(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export { getAllManufactures, getManufactureById, addNewManufacture };
