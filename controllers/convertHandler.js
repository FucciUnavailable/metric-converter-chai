const { parse } = require("dotenv");

function ConvertHandler() {
  
  this.getNum = function(input) {
    let regexNum = /[^a-zA-Z]/gm
    let number = input.match(regexNum)
    if(!number){
      return 1
    }
    let invalidNumberTest = /^(\d+\.?\d*|\.\d+)(\/\d+\.?\d*)?$/gm
    if (!invalidNumberTest.test(number.join(''))) return "invalid number"
    for (let i = 0; i<number.length;i++){
      let arr
      if (number[i] == "/"){
        arr = number.join('').split('/')
        return (arr[0]/arr[1])
      }
    }

    return number.join('')
  
    
    };
  
  this.getUnit = function(input) {
    let result = input.match(/[a-zA-Z]+/g);
    let validUnits = ["gal", "lbs", "mi", "km", "l", "kg"]
    if (!validUnits.includes(result.join('').toLowerCase())) return 'invalid unit'
    if (result.join('').toLowerCase() == "l") return "L"
    return result ? result.join('').toLowerCase() : 'invalid unit';
    };
  
  this.getReturnUnit = function(initUnit) {
    switch(initUnit){
        case "gal": return "L"
        case "lbs": return "kg"
        case "mi": return "km"
        case "L": return "gal"
        case "kg": return "lbs"
        case "km": return "mi"
        default: return 'invalid unit'
    }
    
    
  };

  this.spellOutUnit = function(unit) {
    switch(unit){
      case "gal": return "gallon"
      case "lbs": return "pounds"
      case "mi": return "miles"
      case "L": return "liters"
      case "kg": return "kilograms"
      case "km": return "kilometers"
      default: return 'invalid unit'
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const roundTo = (num, decimals) => {
      return parseFloat(num.toFixed(decimals));
    };
    switch (initUnit) {
      case "gal": return roundTo(initNum * galToL, 5);
      case "lbs": return roundTo(initNum * lbsToKg, 5);
      case "mi": return roundTo(initNum * miToKm, 5);
      case "L": return roundTo(initNum / galToL, 5);
      case "kg": return roundTo(initNum / lbsToKg, 5);
      case "km": return roundTo(initNum / miToKm, 5);
      default: return null;
    }
  };
  

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    initUnit == "l"? initUnit = initUnit.toUpperCase() : null
    returnUnit == "l"? returnUnit = returnUnit.toUpperCase() : null
    let result = { initNum: initNum, initUnit: initUnit, returnNum: returnNum, returnUnit: returnUnit, string: initNum + " " + this.spellOutUnit(initUnit) + " converts to "+ returnNum + " "+ this.spellOutUnit(returnUnit)};
    return result;
  };
  
}

module.exports = ConvertHandler;
