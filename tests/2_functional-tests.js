/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  suite('GET /api/stock-prices => stockData object', function() {

    test('1 stock', function(done) {
      const stock = 'goog';
      chai.request(server)
        .get('/api/stock-prices')
        .query({stock: stock})
        .end(function(err, res) {
          if (err) console.log(err.text);
          assert.property(res.body, 'stock');
          assert.property(res.body, 'likes');
          assert.property(res.body, 'price');
          assert.equal(res.body.stock, stock)
          assert.isAtLeast(res.body.likes, 0);
          assert.isAtLeast(res.body.price, 0);
          done();
        });
    });

    test.skip('1 stock with like', function(done) {
      assert.fail();
      done();
    });

    test.skip('1 stock with like again (ensure likes arent double counted)', function(done) {
      assert.fail();
      done();
    });

    test.skip('2 stocks', function(done) {
      assert.fail();
      done();
    });

    test.skip('2 stocks with like', function(done) {
      assert.fail();
      done();
    });

  });

});
