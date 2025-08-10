const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    user: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD), // force string
    database: process.env.DB_NAME,
});

pool.connect()
    .then(() => console.log("PostgreSQL Connected"))
    .catch(err => console.error("Connection error", err));

module.exports = pool;
