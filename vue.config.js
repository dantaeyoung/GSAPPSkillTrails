const fs = require("fs");

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/GSAPPSkillTree/" : "/",
  devServer: {
    https: {
      key: fs.readFileSync("./certs/example.com+5-key.pem"),
      cert: fs.readFileSync("./certs/example.com+5.pem")
    },
    host: "0.0.0.0",
  }
};
