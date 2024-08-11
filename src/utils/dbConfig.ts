// src/database.ts
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'tix',
    password: 'anonyme',
    database: 'ventes'
});

export default pool;
