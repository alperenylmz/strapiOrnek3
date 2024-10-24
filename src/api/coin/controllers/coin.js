// ./src/api/coin/controllers/coin.js

const fetch = require("node-fetch");

module.exports = {
  async getBRNPrice(ctx) {
    try {
      // CoinMarketCap API isteği
      const response = await fetch(
        "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=BRN",
        {
          method: "GET",
          headers: {
            "X-CMC_PRO_API_KEY": "6699b95a-1788-43d4-8706-00035b2dc749", // Kendi API key'inizi buraya ekleyin
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();

      // API'den gelen veriyi Strapi frontend'e döner
      return ctx.send(data);
    } catch (error) {
      // Hata durumunda
      ctx.throw(500, "CoinMarketCap API isteği başarısız.");
    }
  },
};
