var express = require('express');
var router = express.Router();

var connectionString  = "postgres://eyqszcfy:vkKHdOqpgL2e7aBP_X-RSY2wTppmCyk4@ella.db.elephantsql.com/eyqszcfy" 
//var client = new pg.Client(conString);

const { Pool } = require('pg')

const pool = new Pool({connectionString })

router.get('/',(req,res)=>{
 pool
      .connect()
      .then(()=>{
         pool.query('SELECT * FROM userslist;')
         .then(response => res.status(200).send(response.rows))
         .catch(err => console.log(err))
      })
      .catch((err) => console.log(err))

})



// router.get('/', async (req, res, next) => {
//     try {
//  client.connect(function(err) {
//   if(err) {
//     return console.error('could not connect to postgres', err);
//   }
//     client.query('SELECT NOW() AS "theTime"', function(err, result) {
//     if(err) {
//       return console.error('error running query', err);
//     }
//     console.log(result.rows[0].theTime);
    
//     // >> output: 2018-08-23T14:02:57.117Z
//     client.end();
//   });
// });
//     }catch(err){
//       next(err);
//     }
// });
module.exports= router;