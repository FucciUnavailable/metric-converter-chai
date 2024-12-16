'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  
app.get("/api/convert", (req,res)=>{
  let data = req.query.input
  let number = convertHandler.getNum(data)
  let unit = convertHandler.getUnit(data)
  let returnUnit = convertHandler.getReturnUnit(unit)
  if (unit == 'invalid unit'  && number == 'invalid number'){
    res.send("invalid number and unit")
    return
  }
  if (unit == 'invalid unit' || returnUnit == 'invalid unit'){
    res.send("invalid unit")
    return
  }
  if (number == 'invalid number'){
    res.send("invalid number")
    return
  }

  let conversion = convertHandler.convert(number, unit)
  let response = convertHandler.getString(number, unit, conversion, returnUnit)
  res.send(response)
})

};
