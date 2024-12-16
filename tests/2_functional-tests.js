const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const axios = require("axios")
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    describe('GET /api/convert', function() {
    
        test('should correctly convert a valid input of 10L to gal', async function() {
          // Make the GET request to the /api/convert endpoint with the query parameter 'input=10L'
          const response = await axios.get('http://localhost:3000/api/convert', {
            params: { input: '10L' }
          });
          // Assert the response status is 200 (OK)
          assert.equal(response.status, 200);
          // Assert that the returned conversion is correct, assuming the conversion handler is accurate
          assert.equal(response.data.returnNum, 2.64172, '10L should convert to 2.64172 gallons');
        });
        test('should return invalid unit for wrong units', async function(){
            const response = await axios.get('http://localhost:3000/api/convert', {
                params: { input: '32g' }
              });
           // Assert the response status is 200 (OK)
          assert.equal(response.status, 200);
          assert.equal(response.data, "invalid unit", "32g should send invalid unit")
        })
        test('should return invalid number for wrong number', async function(){
            const response = await axios.get('http://localhost:3000/api/convert', { 
            params: { input:'3/7.2/4kg' }
            });
            
          assert.equal(response.status, 200)
          assert.equal(response.data, "invalid number", "double fraction should return invalid number")
        })
        test('should return invalid number and unit for wrong number and unit', async function(){
            const response = await axios.get('http://localhost:3000/api/convert', { 
            params: { input:'3/7.2/4kilomegagram' }
            });
            
          assert.equal(response.status, 200)
          assert.equal(response.data, "invalid number and unit", "returns invalid number and unit for invalid number and unit")
        })
        test('should return 1 when no number input is added', async function(){
            const response = await axios.get('http://localhost:3000/api/convert', {params:{input:"kg"}})
            assert.equal(response.status, 200)
            assert.equal(response.data.initNum, 1, "no number input should return 1")
        })
      });

});
