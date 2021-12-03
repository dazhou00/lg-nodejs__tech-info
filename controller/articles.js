const { Article } = require("../model/articles");

// 获取全部
exports.getAll = async (req, res, next) => {
  try {
    // 检测是否存在分类、状态等筛选参数
    const { status, category } = req.query;
    let data;
    if (status || category) {
      data = await Article.find(req.query);
    } else {
      data = await Article.find();
    }

    res.status(200).json({
      code: 200,
      msg: "获取所有文章成功",
      data,
    });
  } catch (err) {
    next(err);
  }
};

// 添加新的
exports.create = async (req, res, next) => {
  try {
    // 创建并存储数据
    const data = new Article(
      Object.assign(req.body, { author: req.userData._id })
    );
    await data.save();

    // 响应
    res.status(200).json({
      code: 200,
      msg: "添加文章成功",
      data,
    });
  } catch (err) {
    next(err);
  }
};

// 获取某个
exports.get = async (req, res, next) => {
  try {
    // 根据 ID 获取数据
    const id = req.params.articleId;
    const data = await Article.findById(id).populate(
      // "category author",
      // "name"
      [{path: 'category',select: 'name'},{path: 'author', select:'name'}]
    );

    // 检测是否存在数据
    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: "获取文章失败",
        value: { id },
      });
    }
    res.status(200).json({
      code: 200,
      msg: "获取文章成功",
      data,
    });
  } catch (err) {
    next(err);
  }
};

// 编辑文章
exports.update = async (req, res, next) => {
  try {
    // 修改数据
    const data = await Article.findByIdAndUpdate(
      req.params.articleId,
      req.body,
      { new: true }
    );

    // 检测并响应
    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: "文章修改失败",
        value: Object.assign(req.body, {
          _id: req.params.articleId,
        }),
      });
    }
    res.status(200).json({
      code: 200,
      msg: "文章修改成功",
      data,
    });
  } catch (err) {
    next(err);
  }
};

// 删除文章
exports.remove = async (req, res, next) => {
  try {
    // 删除数据
    const data = await Article.findByIdAndDelete(
      req.params.articleId
    );

    // 检测并响应
    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: "删除文章失败",
        value: {
          id: req.params.articleId,
        },
      });
    }

    res.status(200).json({
      code: 200,
      msg: "删除文章成功",
      data,
    });
  } catch (err) {
    next(err);
  }
};
