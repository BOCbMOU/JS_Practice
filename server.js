import express from 'express';
import bodyParser from 'body-parser';
import './utils/dotenv';
import fileUpload from 'express-fileupload';
import homeRoute from './routes/homeRoute';
import categoryRoute from './routes/categoryRoute';
import manufactureRoute from './routes/monufactureRoute';
import orderRoute from './routes/orderRoute';
import productRoute from './routes/productRoute';
import userRoute from './routes/userRoute';
import commentRoute from './routes/commentRoute';
import fileRoute from './routes/fileRoute';
import healthCheck from './routes/healthCheck';
import defaultErrorHandler from './middlewares/defaultErrorHandler';

const logger = require('./utils/logger')(process.env.APP_NAME);

const app = express();

app.use(
  fileUpload({
    limit: { fileSize: 2 * 1024 * 1024 },
    createParentPath: true,
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/public`));
app.use('/files', fileRoute);

app.use('/', homeRoute);
app.use('/categories', categoryRoute);
app.use('/products', productRoute);
app.use('/orders', orderRoute);
app.use('/users', userRoute);
app.use('/comments', commentRoute);
app.use('/manufactures', manufactureRoute);
app.use(`/api/v${process.env.API_VERSION}`, healthCheck);

app.use(defaultErrorHandler);

app.listen(process.env.APP_PORT, 'localhost', () => {
  logger.log(
    'info',
    `App is running at http://localhost:${process.env.APP_PORT} in ${app.get('env')} mode.`,
  );
});

module.exports = app;
