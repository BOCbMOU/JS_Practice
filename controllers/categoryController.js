import makeQuery from '../services/mysqlConnection';
import AppError from '../errors/AppError';

const getCategoryFromDB = id => {
  const sql = `select * from category where id=?`;
  return makeQuery(sql, id);
};

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
    const data = await getCategoryFromDB(id);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const addNewCategory = async (req, res, next) => {
  try {
    const { title, description, category_id } = req.body;
    const sql = 'insert into category set ?';
    const data = await makeQuery(sql, { title, description, category_id });
    res.status(201).send(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id === undefined) {
      return res.status(404).send('Did not get id');
    }

    const oldData = await getCategoryFromDB(id);
    if (oldData.length === 0) {
      return res.status(404).send('Unknown id');
    }

    const { title, description, category_id } = req.body;
    const { created_at } = oldData;
    const updated_at = new Date();

    const sql = `update category set ? where id = ${id}`;
    const newData = await makeQuery(sql, {
      title,
      description,
      category_id,
      created_at,
      updated_at,
    });

    res.status(202).send(newData);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getCategoryFromDB(id);
    if (data.length === 0) {
      return res.status(404).send('Unknown id');
    }

    const sql = `delete from category where id = ?`;
    await makeQuery(sql, id);

    res.status(202).send(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export { getAllCategories, getCategoryById, addNewCategory, updateCategory, deleteCategory };
