const StockURL = (symbol) => `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${symbol}/quote`;

const mongoose = require('mongoose');
const CONNECTION_STRING = process.env.DB;
const fetch = require('node-fetch');


mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const Stocks = mongoose.model('stock', {
  symbol: String,
  price: Number,
  likes: [String],
});


module.exports = function() {

  this.getStock = async (stock) => {
    const fetched = await (await fetch(StockURL(stock))).json();
    const res = await Stocks.findOneAndUpdate(
      {symbol: stock},
      {$set: {price: fetched.latestPrice}},
      {new: true, upsert: true, },
      (_, data) => data)

    return {stock: res.symbol, likes: res.likes.length, price: res.price};
  }
}