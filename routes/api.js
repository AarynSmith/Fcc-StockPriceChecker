/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';
var StockHandler = require('../controllers/stockHandler');
const stocks = new StockHandler();
module.exports = function(app) {
  app.route('/api/stock-prices')
    .get(async function(req, res) {
      const stock = await stocks.getStock(req.query.stock)
      res.json(stock);
    });


};
