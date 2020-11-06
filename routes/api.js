'use strict';

var StockHandler = require('../controllers/stockHandler');
const stocks = new StockHandler();

module.exports = function(app) {
  app.route('/api/stock-prices')
    .get(async function(req, res) {
      if (!Array.isArray(req.query.stock)) {
        const stock = await stocks.getStock({
          stock: req.query.stock,
          like: req.query.like,
          ip: req.ip
        })
        res.json({
          stockdata: {
            stock: stock.symbol,
            likes: stock.likes.length,
            price: stock.price
          }
        });
      } else {
        const stockRes = [await stocks.getStock({
          stock: req.query.stock[0],
          like: req.query.like,
          ip: req.ip
        }), await stocks.getStock({
          stock: req.query.stock[1],
          like: req.query.like,
          ip: req.ip
        })];
        res.json({
          stockdata: [
            {
              stock: stockRes[0].symbol,
              price: stockRes[0].price,
              rel_likes: stockRes[0].likes.length - stockRes[1].likes.length,
            },
            {
              stock: stockRes[1].symbol,
              price: stockRes[1].price,
              rel_likes: stockRes[1].likes.length - stockRes[0].likes.length,
            },
          ]
        });
      }
    });
};
