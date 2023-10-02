const AddComment = require("../models/addComment");
const Blog = require("../models/blog");

exports.addBlog = (req, res, next) => {
  const { title, author, content } = req.body;
  const newBlog = Blog.create({
    title: title,
    author: author,
    content: content,
  })
    .then((blogresponse) => {
      console.log("Added Blog");
      res.json(blogresponse);
    })
    .catch((err) => console.log(err));
};

exports.getBlog = (req, res, next) => {
  Blog.findAll()
    .then((blogresponse) => {
      console.log("Fetching Blogs");
      res.json(blogresponse);
    })
    .catch((err) => console.log(err));
};
exports.addComment = (req, res, next) => {
  const { comment, id } = req.body;

  Blog.findByPk(id)
    .then((blog) => {
      console.log(blog);
      if (!blog) {
        throw new Error("Blog Not found");
      }
      return blog.createAddComment({
        comment: comment,
        blogId: id,
      }).the((commentBlog) => {
        res.json(commentBlog);
      });
    })
    .then((blogs) => {
      if (blogs.length > 0) {
        let blog = blogs[0];
        console.log(blog);
        return blog.addComment;
      }
    })
    .then((commetBlog) => {
      console.log(commetBlog);
    })
    .catch((err) => console.log(err));
};
exports.deleteComment = (req, res, next) => {};
