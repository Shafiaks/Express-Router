var express = require('express');
var router = express.Router();
require('dotenv').config();


var connectionString  =   process.env.connectionString;

const { Pool } = require('pg')

const pool = new Pool({connectionString })


router.put('/',(req,res)=>{
    let id=req.id;
    let firstName=req.firstName;
    let lastName=req.lastName;
    let age=req.age;
  
 pool
      .connect()
      .then(()=>{
         pool.query(`UPDATE  UsersList 
                        SET  FirstName=$1, 
                             LastName=$2,
                             age=$3 
                        WHERE userId=$4;`,[firstName,lastName,age,id])
         .then(response => {
            response.rowCount===0   ? 
            res.status(404).send("User not found !") :
            res.status(200).send("User Information Updated successfully!")
        })
         .catch((err) => {
            console.log("Couldn't Update ",err)
         } );
      })
      .catch((err) => console.log(err))
})

 module.exports= router; 