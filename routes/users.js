let express = require('express');
let router = express.Router();
const pool = require('../DB/dbConnections.js');



//  GET request for all users  in the database
router.get('/', async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM "Users"');
    const allUsers = rows
      .map((user) => `<li><a>${user.FirstName}</a></li>`)
      .join('');
    return res.status(200).send(`<ul>${allUsers}</ul>`);
  } catch (error) {
    next(error);
  }
});



module.exports = router;
