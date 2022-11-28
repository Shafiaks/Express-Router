var express = require('express');
var router = express.Router();
require('dotenv').config();
var connectionString  =   process.env.connectionString;


const { Pool } = require('pg')

const pool = new Pool({connectionString })

router.get('/',(req,res)=>{

    const id=req.id;
   console.log("id is ",id)
 pool
      .connect()
      .then(()=>{
         pool.query(`SELECT * FROM userslist where userId=$1;`,[id])
         .then(response => {
           response.rowCount===0 ? res.send("User Not Found !"): res.status(200).send(response.rows)
         }
          )
         .catch((err) => {
            console.log(err)
         } );
      })
      .catch((err) => console.log(err))

})

 module.exports= router; 