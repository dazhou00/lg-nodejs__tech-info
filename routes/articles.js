/**
 * 文章
 */
const router = require("express").Router();

const { articleValidator } = require("../model/articles");
const validator = require("../middleware/validate");

const article = require("../controller/articles");

const auth = require("../middleware/auth");

// 获取全部
router.get("/", auth, article.getAll);

// 获取单个文章
router.get("/:articleId", auth, article.get);

// 添加文章
router.post(
  "/",
  [auth, validator(articleValidator)],
  article.create
);

// 编辑文章
router.put(
  "/:articleId",
  [auth, validator(articleValidator)],
  article.update
);

// 删除文章
router.delete("/:articleId", auth, article.remove);

module.exports = router;
