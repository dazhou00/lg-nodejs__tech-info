// 引入数据模型
const { User } = require("../model/user");

const {Article} = require('../model/articles')

const bcrypt = require("bcrypt");

// 用户注册接口
exports.register = async (req, res, next) => {
  try {
    // 存储经过校验的数据
    let { email, password } = req.validValue;
    // 查询邮箱是否已经被注册过
    let user = await User.findOne({ email });

    // 检测是否存在获取到的用户信息
    if (user) {
      // 无法再次注册。响应注册失败
      return res.status(400).json({
        code: 400,
        msg: "用户已注册",
        data: { email },
      });
    }

    // 可注册新的用户
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    // 创建 user 实例
    user = new User({
      email,
      password,
      name: "请添加用户名",
    });

    // 存储
    await user.save();

    // 响应
    res.status(200).json({
      code: 200,
      msg: "注册成功",
      data: { email },
    });
  } catch (err) {
    next(err);
  }
};

// 获取用户信息
exports.getInfo = async (req, res, next) => {
  try {
    // 查询用户信息
    const data = await User.findById(req.userData._id, {
      password: 0,
    });

    // 发送响应
    res.status(200).json({
      code: 200,
      msg: "获取用户成功",
      data,
    });
  } catch (err) {
    next(err);
  }
};

// 编辑用户
exports.updateInfo = async (req, res, next) => {
  try {
    // 检测是否存在 _id 参数
    const body = req.body;
    if (!body._id) {
      return res.status(400).json({
        code: 400,
        msg: "缺少参数 _id",
      });
    }

    // 对编辑用户的密码进行加密，同时也对 email 进行查询，避免重复
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);

    // 查找并更新用户
    const data = await User.findByIdAndUpdate(
      body._id,
      body
    );
    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: "编辑用户信息失败",
      });
    }

    // 成功响应
    delete body.password; // 不响应密码
    res.status(200).json({
      code: 200,
      msg: "编辑用户信息成功",
      data: body,
    });
  } catch (err) {
    next(err);
  }
};

// 删除用户
exports.deleteUser = async (req, res, next) => {
  try {
    // 检测是否存在 id
    const id = req.body._id;
    if (!id) {
      return res.status(400).json({
        code: 400,
        msg: "请传入id",
      });
    }

    // 查找用户数据并删除
    const data = await User.findByIdAndDelete(id);

    await Article.remove({
      author: id
    })

    // data 为 null 说明没有删除成功
    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: "删除用户失败",
        value: {
          _id: id,
        },
      });
    }

    // 删除成功，正常响应
    res.status(200).json({
      code: 200,
      msg: "删除用户成功",
      data,
    });
  } catch (err) {
    next(err);
  }
};
