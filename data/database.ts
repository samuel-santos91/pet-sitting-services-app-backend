import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'sql6.freesqldatabase.com',
  database: 'sql6635153',
  user: 'sql6635153',
  password: '18jgi9psXg',
});

export default pool;

