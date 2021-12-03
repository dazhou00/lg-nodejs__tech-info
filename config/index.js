module.exports = {
  // 项目配置
  app: {
    port: process.env.PORT || 3000,
  },
  // 数据库配置
  db: {
    url:
      process.env.MONGODB_URL ||
      "mongodb://localhost:27017/techinfoapi",
  },

  // jwt 使用密钥
  jwtPrivateKey: "0373cd60-5256-52dc-989a-c06b7fef6a5c",
};
