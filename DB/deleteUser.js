var express = require('express');
var router = express.Router();
require('dotenv').config();


var connectionString  =   process.env.connectionString;

const { Pool } = require('pg')

const pool = new Pool({connectionString })


router.delete('/',(req,res)=>{
    let id=req.id;
  
 pool
      .connect()
      .then(()=>{
         pool.query(`DELETE FROM UsersList WHERE userId = $1`,[id])
         .then(response => {
            response.rowCount===0   ? 
              res.status(404).send("User not found !") :
              res.status(200).send("deleted successfully!")
        })
         .catch((err) => {
            console.log(err)
         } );
      })
      .catch((err) => console.log(err))
})

 module.exports= router; 