module.exports = {
  //...
  devServer: {
    client: {
      webSocketURL: {
        hostname: "",
        pathname: "/ws",
        password: "dev-server",
        port: 8080,
        protocol: "ws",
        username: "webpack",
      },
    },
    headers: {
      "X-Frame-Options": "allow-from *",
      "Access-Control-Allow-Origin": "*",
    },
  },
};
