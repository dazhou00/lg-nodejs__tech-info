/**
 * 用户
 */
const router = require("express").Router();

// 用户注册
router.post("/", (req, res, next) => {
  res.send("用户注册");
});

// 获取用户
router.get("/", (req, res, next) => {
  res.send("获取用户");
});

// 编辑用户
router.put("/", (req, res, next) => {
  res.send("编辑用户");
});

// 删除用户
router.delete("/", (req, res, next) => {
  res.send("删除用户");
});

module.exports = router;
