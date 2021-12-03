const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const jwt = require("jsonwebtoken");
const config = require("../config");

// 定义 user 的接口
const userSchema = new mongoose.Schema({
  // 邮箱
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50,
    unique: true,
  },
  // 用户名
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  // 密码
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
});

// 为 User 封装生成 Token 的功能
userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    config.jwtPrivateKey
  );
};

// 创建 Model
const User = mongoose.model("User", userSchema);

function userValidator(data) {
  // 创建内容校验规则对象
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .trim()
      .lowercase()
      .required()
      .messages({
        "string.base": "email 必须为 String",
        "any.required": "缺少必选参数 email",
        "string.email": "email 格式错误",
      }),
    name: Joi.string().min(2).max(50).messages({
      "string.base": "name 必须为 String",
      "string.min": "name 最少 2 个字符",
      "string.max": "name 最多 50 个字符",
    }),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{6,12}$/)
      .exist()
      .messages({
        "string.pattern.base": "密码不符合规则",
        "String.base": "password 必须为 String",
        "any.required": "缺少必选参数 password",
      }),
    _id: Joi.objectId(),
  });

  return schema.validate(data);
}

module.exports = {
  User,
  userValidator,
};
