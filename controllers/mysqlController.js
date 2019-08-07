import mysql from 'mysql';

const selectAllFrom = (res, sqlRequest) => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });
  connection.connect();
  connection.query(sqlRequest, null, (error, result) => {
    if (error) console.log(error);
    if (result) res.json(result);
  });
  connection.end();
};

export default selectAllFrom;
