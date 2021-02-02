const {pool} = require('../../../config/pool');

module.exports = async function getData(req, res) {
  pool.query('SELECT * FROM data', (err, result) => {
    if (err) {
      return err;
    }

    return res.send(result.rows);
  });
};
