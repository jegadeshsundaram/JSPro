//db.js
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

// Create the connection pool. The pool handles opening and closing connections.
export const db = mysql.createPool({
   host: process.env.DB_HOST || 'localhost',
   user: process.env.DB_USER || 'root',
   password: process.env.DB_PASSWORD || '',
   database: process.env.DB_NAME || 'app',
   waitForConnections: true,
   connectionLimit: 10
});