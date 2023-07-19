import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'us-cdbr-east-06.cleardb.net',
  database: 'heroku_d1337da861f75bf',
  user: 'be52b63b3bfc58',
  password: '3e1f8a99',
});

export default pool;

