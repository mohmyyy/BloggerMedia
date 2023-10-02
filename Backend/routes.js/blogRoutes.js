const express = require("express");
const router = express.Router();

const blogControllers = require("../controller/blogControllers");

router.post("/add-blog", blogControllers.addBlog);
router.get("/get-blogs", blogControllers.getBlog);
router.post("/add-comment", blogControllers.addComment);
// router.get("/get-comment", blogControllers.deleteComment);
// router.get("/delete-comment", blogControllers.deleteComment);

module.exports = router;
