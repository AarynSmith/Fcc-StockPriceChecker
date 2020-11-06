'use strict';

var StockHandler = require('../controllers/stockHandler');
const stocks = new StockHandler();

module.exports = function(app) {
  app.route('/api/stock-prices')
    .get(async function(req, res) {
      const stock = await stocks.getStock({
        stock: req.query.stock,
        like: req.query.like,
        ip: req.ip
      })
      res.json(stock);
    });
};
