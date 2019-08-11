import makeQuery from '../services/mysqlConnection';
import AppError from '../errors/AppError';

const getManufactureFromDB = id => {
  const sql = `select * from manufacture where id=?`;
  return makeQuery(sql, id);
};

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

const updateManufacture = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id === undefined) {
      return res.status(404).send('Did not get id');
    }

    const oldData = await getManufactureFromDB(id);
    if (oldData.length === 0) {
      return res.status(404).send('Unknown id');
    }

    const { title, description, picture } = req.body;
    const { created_at } = oldData;
    const updated_at = new Date();

    const sql = `update manufacture set ? where id = ${id}`;
    const newData = await makeQuery(sql, {
      title,
      description,
      picture,
      created_at,
      updated_at,
    });

    res.status(202).send(newData);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const deleteManufacture = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getManufactureFromDB(id);
    if (data.length === 0) {
      return res.status(404).send('Unknown id');
    }

    const sql = `delete from manufacture where id = ?`;
    await makeQuery(sql, id);

    res.status(202).send(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export {
  getAllManufactures,
  getManufactureById,
  addNewManufacture,
  updateManufacture,
  deleteManufacture,
};
