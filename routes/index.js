let express = require('express');
let router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/', function(req, res, next) {
//   axios.get('')
//    res.render('index', { title: 'Express' });
//   });

// API key e9460df6-1fb8-4408-97c0-8af35b565941 ------https://api.elephantsql.com/e9460df6-1fb8-4408-97c0-8af35b565941

module.exports = router;
