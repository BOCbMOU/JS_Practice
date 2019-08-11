import AppError from '../errors/AppError';

const saveFile = async (req, res, next) => {
  try {
    const { file } = req.files;
    if (!file) {
      return res.status(404).send('Didnt get file');
    }
    const now = new Date();

    let ext = file.name.split('.');
    if (!Array.isArray(ext) && ext.length > 1) {
      ext = file.mimeType.split('/');
    }

    const newFileName =
      `img_${now.getDate()}-${`0${now.getMonth()}`.slice(-2)}-${now.getFullYear()}_` +
      `${now.getTime()}.${ext.pop()}`;
    file.mv(`${__dirname}/../public/files/${newFileName}`);
    res.status(201).send('ok');
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export { saveFile };
