import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  database: 'marketplace_app',
  user: 'root',
  password: 'Database1991@',
});

export default pool;
