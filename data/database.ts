import mysql from 'mysql2/promise';
import dotenv from "dotenv";

dotenv.config();

const databasePassword = process.env.DATABASE_PASSWORD!;

const pool = mysql.createPool({
  host: 'localhost',
  database: 'marketplace_app',
  user: 'root',
  password: databasePassword,
});

export default pool;

