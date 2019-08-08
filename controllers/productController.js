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
    const { id } = req.params;
    const sql = `select * from product_card where id=?`;
    const data = await makeQuery(sql, id);
    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const addNewProduct = async (req, res, next) => {
  try {
    const { body } = req;
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
    const sql =
      'insert into product_card set ?';
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
    });
    res.status(201).send(data);

    res.send('ok');
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export { getAllProducts, getProductById, addNewProduct };
