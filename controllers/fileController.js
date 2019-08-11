import AppError from '../errors/AppError';

const saveFile = async (req, res, next) => {
  try {
    const { file } = req.files;
    const { body } = req;
    if (!file) {
      return res.status(404).send('Didnt get file');
    }
    const now = new Date();

    let ext = file.name.split('.');
    const type = file.mimetype.split('/');
    if (!Array.isArray(ext)) {
      ext = type;
    }

    const newFileName =
      `${type[0]}_${`0${now.getDate()}`.slice(-2)}_${body.entityId}-${`0${now.getMonth()}`.slice(-2)}-` +
      `${now.getFullYear()}_${now.getTime()}`;
    file.mv(`${__dirname}/../public/${body.entity}/${newFileName}.${ext.pop()}`);

    res.status(201).send('ok');
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export { saveFile };
