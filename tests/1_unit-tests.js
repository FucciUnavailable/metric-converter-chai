const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite("getNum(input)", function(){
        test("convertHandler should correctly read a whole number input.", function(done){
            let input = "35gal"
            let expected = 35
            assert.equal(convertHandler.getNum(input),expected,"the answer for 35gal is 35")
            done()
        })
        test("convertHandler should correctly read a decimal number input.", function(done){
            let input = "3.5gal"
            let expected = 3.5
            assert.equal(convertHandler.getNum(input),expected,"the answer for 3.5gal is 3.5")
            done()
        })
        test("convertHandler should correctly read a fractional input.", function(done){
            let input = "1/2gal"
            let expected = 0.5
            assert.equal(convertHandler.getNum(input),expected,"the answer for 1/2gal is 0.5")
            done()
        })
        test("convertHandler should correctly read a fractional input with a decimal.", function(done){
            let input = "5.2/2gal"
            let expected = 2.6
            assert.equal(convertHandler.getNum(input),expected,"the answer for 5.2/2gal is 2.6")
            done()
        })
        test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).", function(done){
            let input = "5/3/3l"
            let expected = "invalid number"
            assert.equal(convertHandler.getNum(input), expected,"the answer for 5/3/3l is invalid number")
            done()
        })
        test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", function(done){
            let input = "gal"
            let expected = 1
            assert.equal(convertHandler.getNum(input), expected,"the answer for gal is 1")
            done()
        })
    })
    suite("get unit", function(){
        test("convertHandler should correctly read each valid input unit.", function(done){
            let input = "5gal"
            let expected = "gal"
            assert.equal(convertHandler.getUnit(input), expected, "the answer for 5gal is gal")
            done()
        })
        test("convertHandler should correctly return an error for an invalid input unit.", function(done){
            let input = "5gl"
            let expected = "invalid unit"
            assert.equal(convertHandler.getUnit(input), expected, "the answer to 5gl is invalid unit")
            done()
        })
    })
    suite("get return unit", function(){
        test("convertHandler should return the correct return unit for each valid input unit.", function(done){
            let input = "mi"
            let expected = "km"
            assert.equal(convertHandler.getReturnUnit(input), expected,"the response for mi should be km")
            done()
        })
        test("convertHandler should correctly return the spelled-out string unit for each valid input unit.", function(done){
            let input = "km"
            let expected = "kilometers"
            assert.equal(convertHandler.spellOutUnit(input), expected, "the response for km is kilometers")
            done()
        })
        test("convertHandler should correctly convert gal to L.", function(done){
            let input = "L"
            let expected = "gal"
            assert.equal(convertHandler.getReturnUnit(input), expected, "the response for l is gal")
            done()
        })
        test("convertHandler should correctly convert L to gal.", function(done){
            let input = "gal"
            let expected = "L"
            assert.equal(convertHandler.getReturnUnit(input), expected,"the answer for gal is L")
            done()
        })
        test("convertHandler should correctly convert mi to km.", function(done){
            let input = "mi"
            let expected = "km"
            assert.equal(convertHandler.getReturnUnit(input), expected, "mi should return km")
            done()
        })
        test("convertHandler should correctly convert km to mi.", function(done){
            let input = "km"
            let expected = "mi"
            assert.equal(convertHandler.getReturnUnit(input), expected, "km should return mi")
            done()
        })
        test("convertHandler should correctly convert lbs to kg.", function(done){
            let input = "lbs"
            let expected = "kg"
            assert.equal(convertHandler.getReturnUnit(input), expected, "lbs should return kg")
            done()
        })
        test("convertHandler should correctly convert kg to lbs.", function(done){
            let input = "kg"
            let expected = "lbs"
            assert.equal(convertHandler.getReturnUnit(input), expected, "kg should return lbs")
            done()
        })
    })

});