import makeQuery from '../services/mysqlConnection';
import AppError from '../errors/AppError';

const getAllUsers = async (req, res, next) => {
  try {
    const sql = `select * from user`;
    const data = await makeQuery(sql);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sql = `select * from user where id=?`;
    const data = await makeQuery(sql, id);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const addNewUser = async (req, res, next) => {
  try {
    const created_at = new Date();

    const { body } = req;
    const { first_name, last_name, image, password, email, is_active, last_visited } = body;
    const sql = 'insert into user set ?';
    const data = await makeQuery(sql, {
      first_name,
      last_name,
      image,
      password,
      email,
      is_active,
      last_visited,
      created_at,
    });
    res.status(201).send(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export { getAllUsers, getUserById, addNewUser };
