var express = require('express');
var router = express.Router();
const pool = require('../DB/dbConnections.js');

//  GET request for a perticular user from the database
router.get('/:id', async (req, res, next) => {
    try {
      const id=req.params.id;  
      const { row } = await pool.query(`SELECT * FROM "Users" where UserId =${id} `);
      if(res.rowCount ===0){
        return res.status('404').send("<h3>User Not FOund !</h3>")
      }
      return res.status('200').send(`<h3>Users Details</h3> \n <h5> ${row.FirstName} ' ' ${row.LastName} </h5>`)
    } catch (error) {
      next(error);
    }
  });

  module.exports =router;
  