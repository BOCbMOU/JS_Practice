import makeQuery from '../services/mysqlConnection';
import AppError from '../errors/AppError';

const getCommentFromDB = id => {
  const sql = `select * from user where id=?`;
  return makeQuery(sql, id);
};

const getAllComments = async (req, res, next) => {
  try {
    const sql = `select * from comment`;
    const data = await makeQuery(sql);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const getCommentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getCommentFromDB(id);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const getCommentsByProductId = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const sql = `select * from comment where product_id = ?`;
    const data = await makeQuery(sql, productId);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const getCommentsByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const sql = `select * from comment where user_id = ?`;
    const data = await makeQuery(sql, userId);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const addNewComment = async (req, res, next) => {
  try {
    const created_at = new Date();

    const { body } = req;
    const { title, text, user_id, product_id } = body;
    const sql = 'insert into comment set ?';
    const data = await makeQuery(sql, { title, text, user_id, product_id, created_at });
    res.status(201).send(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const updateComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id === undefined) {
      return res.status(404).send('Did not get id');
    }

    const oldData = await getCommentFromDB(id);
    if (oldData.length === 0) {
      return res.status(404).send('Unknown id');
    }

    const { title, text } = req.body;
    const { user_id, product_id, created_at } = oldData;
    const updated_at = new Date();

    const sql = `update comment set ? where id = ${id}`;
    const newData = await makeQuery(sql, {
      title,
      text,
      user_id,
      product_id,
      created_at,
      updated_at,
    });

    res.status(202).send(newData);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getCommentFromDB(id);
    if (data.length === 0) {
      return res.status(404).send('Unknown id');
    }

    const sql = `delete from comment where id = ?`;
    await makeQuery(sql, id);

    res.status(202).send(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export {
  getAllComments,
  getCommentById,
  getCommentsByProductId,
  getCommentsByUserId,
  addNewComment,
  updateComment,
  deleteComment,
};
