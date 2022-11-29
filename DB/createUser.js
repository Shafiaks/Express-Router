var express = require('express');
var router = express.Router();
require('dotenv').config();


var connectionString  =   process.env.connectionString;
let userId =12;

const { Pool } = require('pg')

const pool = new Pool({connectionString })


router.post('/',(req,res)=>{
    let firstName=req.firstName;
    let lastName=req.lastName;
    let age=req.age;
    console.log("new entry",firstName,lastName,age)
  
 pool
      .connect()
      .then(()=>{
         pool.query(`INSERT INTO UsersList(
            UserId, FirstName, LastName,age)
            VALUES ($1, $2,$3,$4);`,[userId,firstName,lastName,age])
         .then(response => {
            console.log(response);
            userId++;
            return res.status(201).send("Created new user!")
        })
         .catch((err) => {
            console.log(err)
         } );
      })
      .catch((err) => console.log(err))
})

 module.exports= router; 