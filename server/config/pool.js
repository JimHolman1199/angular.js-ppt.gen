const Pool = require('pg').Pool;
module.exports.pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'presentation',
  password: 'admin',
  port: 5432,
});
