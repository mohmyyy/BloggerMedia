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
  Blog.findAll({ include: [AddComment] })
    .then((blogresponse) => {
      console.log("Fetching Blogs");
      return res.json(blogresponse);
    })
    .catch((err) => console.log(err));
};

// exports.addComment = (req, res, next) => {
//   const { comment, id } = req.body;

//   Blog.findByPk(id)
//     .then((blog) => {
//       console.log("line 31", blog);
//       if (!blog) {
//         throw new Error("Blog Not found");
//         return;
//       }
//       return blog
//         .createCommentId({
//           throught: {
//             comment: comment,
//             blogId: id,
//           },
//         })
//         .then((commentBlog) => {
//           res.json(commentBlog);
//         });
//     })
//     .then((blogs) => {
//       if (blogs.length > 0) {
//         let blog = blogs[0];
//         console.log(blog);
//         return blog.addComment;
//       }
//     })
//     .then((commetBlog) => {
//       console.log(commetBlog);
//     })
//     .catch((err) => console.log(err));
// };

exports.addComment = async (req, res, next) => {
  try {
    const { comment, id } = req.body;
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    // const newComment = await AddComment.create({ comment });
    // const newComment = await blog.createAddComment({ comment });
    const newComment = await AddComment.create({
      comment: comment,
      blogId: id,
    });

    // await blog.addAddComment(newComment);

    res.json({ success: true, comment: newComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteComment = (req, res, next) => {
  Blog.findAll;
};
