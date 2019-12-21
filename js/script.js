// The API we're using for grabbing cryptocurrency prices.  The service can be
// found at: https://coinmarketcap.com/api/
let COINMARKETCAP_API_URI = "https://api.coinmarketcap.com";

// The amount of milliseconds (ms) after which we should update our currency
// charts.
let UPDATE_INTERVAL = 60 * 1000;

let app = new Vue({
  el: "#app",
  data: {
    coins: [],
    coinData: {}
  },
  methods: {
    /**
     * Get the top 10 cryptocurrencies by value.  This data is refreshed each 5
     * minutes by the backing API service.
     */
    getCoins: function() {
      let self = this;
      axios
        .get(COINMARKETCAP_API_URI + "/v1/ticker/?limit=10")
        .then(resp => {
          self.coins = resp.data;
        })
        .catch(err => {
          console.log("err:", err);
        });
    },

    /**
     * Given a cryptocurrency ticket symbol, return the currency's logo
     * image.
     */
    getCoinImage: function(symbol) {
      return CRYPTOCOMPARE_API_URI + this.coinData[symbol].ImageUrl;
    },
    getColor: num => {
      return num > 0 ? "color: green;" : "color: red";
    }
  },
  created: function() {
    this.getCoins();
  }
});

/**
 * Once the page has been loaded and all of our app stuff is working, we'll
 * start polling for new cryptocurrency data every minute.
 *
 */
setInterval(() => {
  app.getCoins();
}, UPDATE_INTERVAL);
