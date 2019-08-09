import makeQuery from '../services/mysqlConnection';
import AppError from '../errors/AppError';

const saveFile = async (req, res, next) => {
  try {
    const { image } = req.files;
    if(!image) {
      return res.status(404).send('Didnt get file');
    }
    const now = new Date();

    let ext = image.name.split('.');
    if (!Array.isArray(ext) && ext.length > 1) {
      ext = image.mimeType.split('/');
    }

    const newFileName = `img_${now.getDay()}-${now.getMonth()}-${now.getFullYear()}-${now.getMilliseconds()}.${ext.pop()}`;
    image.mv(`${__dirname}/../public/${newFileName}`);
    res.status(201).send('ok');
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const loadFile = async (req, res, next) => {
  try {
    res.send('ok');
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export { saveFile, loadFile };
