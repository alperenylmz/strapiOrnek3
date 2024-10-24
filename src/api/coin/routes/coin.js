// ./src/api/coin/routes/coin.js

module.exports = {
    routes: [
      {
        method: "GET",
        path: "/coin/brn-price",
        handler: "coin.getBRNPrice",
        config: {
          auth: false, // İsteğe bağlı olarak bu route'u public hale getirin
        },
      },
    ],
  };
  