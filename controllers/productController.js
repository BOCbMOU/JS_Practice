import makeQuery from '../services/mysqlConnection';
import AppError from '../errors/AppError';

const getProductFromDB = id => {
  const sql = `select * from product_card where id=?`;
  return makeQuery(sql, id);
};

const getAllProducts = async (req, res, next) => {
  try {
    const sql = `select * from product_card`;
    const data = await makeQuery(sql);
    if (data.length > 0) {
      res.json(data);
    }
    res.status(404).send('Page not found');
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getProductFromDB(id);
    if (data.length > 0) {
      res.json(data);
    }
    res.status(404).send('Page not found');
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    let created_at = new Date();
    let updated_at = null;

    if (id) {
      const data = await getProductFromDB(id);
      if (data.length === 0) {
            return res.status(404).send('Unknown id');
      }
      if (data[0].created_at) {
        created_at = data[0].created_at;
        updated_at = new Date();
      }
    }

    const { body } = req;
    console.log(id, body);
    const {
      title,
      image,
      description,
      price,
      amount,
      category_id,
      rate,
      vote,
      discount,
      manufacture_id,
    } = body;

    const sql = `${id ? 'update' : 'insert into'} product_card set ?${
      id ? ` where id = ${id}` : ''
    }`;

    const data = await makeQuery(sql, {
      title,
      image,
      description,
      price,
      amount,
      category_id,
      rate,
      vote,
      discount,
      manufacture_id,
      created_at,
      updated_at,
    });

    return id ? res.status(202).send(data) : res.status(201).send(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getProductFromDB(id);
    if (data.length === 0) {
      return res.status(404).send('Unknown id');
    }

    const sql = `delete from product_card where id=?`;
    await makeQuery(sql, id);
    res.status(202).send(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export { getAllProducts, getProductById, createProduct, deleteProduct };
