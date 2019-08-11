import makeQuery from '../services/mysqlConnection';
import AppError from '../errors/AppError';

const getUserFromDB = id => {
  const sql = `select * from user where id=?`;
  return makeQuery(sql, id);
};

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
    const data = await getUserFromDB(id);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const addNewUser = async (req, res, next) => {
  try {
    const { first_name, last_name, image, password, email, is_active, last_visited } = req.body;
    const createdAt = new Date();

    const sql = 'insert into user set ?';
    const data = await makeQuery(sql, {
      first_name,
      last_name,
      image,
      password,
      email,
      is_active,
      last_visited,
      created_at: createdAt,
    });

    res.status(201).send(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id === undefined) {
      return res.status(404).send('Did not get id');
    }

    const oldData = await getUserFromDB(id);
    if (oldData.length === 0) {
      return res.status(404).send('Unknown id');
    }

    const { first_name, last_name, image, password, email, is_active, last_visited } = req.body;
    const { created_at } = oldData;
    const updated_at = new Date();

    const sql = `update user set ? where id = ${id}`;
    const newData = await makeQuery(sql, {
      first_name,
      last_name,
      image,
      password,
      email,
      is_active,
      last_visited,
      created_at,
      updated_at,
    });

    res.status(202).send(newData);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getUserFromDB(id);
    if (data.length === 0) {
      return res.status(404).send('Unknown id');
    }

    const sql = `delete from user where id = ?`;
    await makeQuery(sql, id);

    res.status(202).send(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export { getAllUsers, getUserById, addNewUser, updateUser, deleteUser };
