const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = function (req, res, next) {
  // 接口鉴权（约定，前端请求头中包含有效信息， authorization 字段，值为 access_token)
  // 保存数据
  const access_token = req.header("authorization");

  // 检测是否存在 access_token
  if (!access_token) {
    return res.status(401).json({
      code: 401,
      msg: "Unauthorized 无 Token",
    });
  }

  try {
    // 存在 access_token 时，验证是否有效
    const userData = jwt.verify(
      access_token,
      config.jwtPrivateKey
    );
    // 得到了 token 中存储的数据（用户信息)， 保存供后续操作使用
    req.userData = userData;
    next();
  } catch (err) {
    return res.status(401).json({
      code: 401,
      msg: "Unauthorized Token 无效",
    });
  }
};
