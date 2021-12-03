const { User } = require("../model/user");

const bcrypt = require("bcrypt");

exports.test = async (req, res, next) => {
  try {
    const validValue = req.validValue;

    // 检测用户是否存在
    let user = await User.findOne({
      email: validValue.email,
    });

    // 获取不到数据，说明用户不存在
    if (!user) {
      return res.status(400).json({
        code: 400,
        msg: "用户名或密码错误",
      });
    }

    // 获取用户信息，再检测密码的正确性
    const compareResult = await bcrypt.compare(
      validValue.password,
      user.password
    );
    // 如果不同， 说明密码错误
    if (!compareResult) {
      return res.status(400).json({
        code: 400,
        msg: "用户名或密码错误",
      });
    }

    // 登录成功，响应成功状态
    res.status(200).json({
      code: 200,
      msg: "登录成功",
      authorization: {
        access_token: user.generateToken(),
      },
    });
  } catch (err) {
    next(err);
  }
};
