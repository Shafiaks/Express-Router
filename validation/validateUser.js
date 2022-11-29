const { body, validationResult } = require('express-validator');
let express = require('express');
let router = express.Router();

const checkValidation = (req, res, next) => {
    console.log("inside validation - firstName :",req.firstName,body('firstName'))
    router.post(
    '/',
    body('firstName').isEmpty(),
    body('lastName').isEmpty(),
    body('age').isNumeric(),

    (req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
    //   User.create({
    //       firstName: req.body.firstName,
    //       lastName: req.body.lastName,
    //       age: req.body.age,
    //   }).then(user => {
      //  res.json(user);
        console.log("user detils is validated ")
   // });
    },
  );

next();
}
    

module.exports = checkValidation;



