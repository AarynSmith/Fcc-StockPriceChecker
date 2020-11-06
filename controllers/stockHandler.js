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

  this.getStock = async (req) => {
    const fetched = await (await fetch(StockURL(req.stock))).json();
    const update = {$set: {price: fetched.latestPrice}};
    if (req.like) update['$addToSet'] = {likes: req.ip}
    return await Stocks.findOneAndUpdate(
      {symbol: req.stock},
      update,
      {new: true, upsert: true, },
      (_, data) => data)
  }
}