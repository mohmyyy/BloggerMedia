const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const blogRoutes = require("./routes.js/blogRoutes");
const Blog = require("./models/blog");
const AddComment = require("./models/addComment");
const commentid = require("./models/commentId");
const sequelize = require("../Backend/util/database");
const CommentId = require("./models/commentId");

app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/blog", blogRoutes);

Blog.hasMany(AddComment);
AddComment.belongsTo(Blog);

// Blog.belongsToMany(AddComment, { through: CommentId });
// AddComment.hasOne(Blog);
// AddComment.belongsTo(Blog, { through: CommentId });
// Blog.belongsToMany(AddComment, { through: "CommentId" });

sequelize
  // .sync({ force: true })
  .sync()
  .then((response) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
