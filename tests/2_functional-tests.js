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
    let likeCount = 0;
    test('1 stock', function(done) {
      const stock = 'goog';
      chai.request(server)
        .get('/api/stock-prices')
        .query({stock})
        .end(function(err, res) {
          if (err) console.log(err.text);
          assert.property(res.body, 'stockdata');
          assert.property(res.body.stockdata, 'stock');
          assert.property(res.body.stockdata, 'likes');
          assert.property(res.body.stockdata, 'price');
          assert.equal(res.body.stockdata.stock, stock)
          assert.isAtLeast(res.body.stockdata.likes, 0);
          likeCount = res.body.stockdata.likes
          assert.isAtLeast(res.body.stockdata.price, 0);
          done();
        });
    });

    test('1 stock with like', function(done) {
      const stock = 'goog';
      chai.request(server)
        .get('/api/stock-prices')
        .query({stock, like: true})
        .end(function(err, res) {
          if (err) console.log(err.text);
          assert.property(res.body, 'stockdata');
          assert.property(res.body.stockdata, 'stock');
          assert.property(res.body.stockdata, 'likes');
          assert.property(res.body.stockdata, 'price');
          assert.equal(res.body.stockdata.stock, stock)
          assert.isAtLeast(res.body.stockdata.likes, likeCount);
          likeCount = res.body.stockdata.likes
          assert.isAtLeast(res.body.stockdata.price, 0);
      done();
        })
    });

    test("1 stock with like again (ensure likes aren't double counted)", function(done) {
      const stock = 'goog';
      chai.request(server)
        .get('/api/stock-prices')
        .query({stock, like: true})
        .end(function(err, res) {
          if (err) console.log(err.text);
          assert.property(res.body, 'stockdata');
          assert.property(res.body.stockdata, 'stock');
          assert.property(res.body.stockdata, 'likes');
          assert.property(res.body.stockdata, 'price');
          assert.equal(res.body.stockdata.stock, stock)
          assert.isAtLeast(res.body.stockdata.likes, likeCount);
          likeCount = res.body.stockdata.likes
          assert.isAtLeast(res.body.stockdata.price, 0);
          done()
        });
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
