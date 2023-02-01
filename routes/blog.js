const router = require("express").Router();
const Blog = require("../models/Blog");
const authMiddle = require("../authmiddle");
//create post
router.post("/", authMiddle, async (req, res) => {
  const { title, description } = req.body.blog;
  try {
    const saveBlog = await Blog.create({
      title,
      description: description,
      createdBy: req.body.user.id,
    });
    res.status(200).json(saveBlog);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update post
router.put("/:id", authMiddle, async (req, res) => {
  const { title, desc } = req.body.blog;

  try {
    const post = await Blog.findById(req.params.id);

    if (post.createdBy.equals(req.body.user._id)) {
      await Blog.updateOne({ $set: { title, description: desc } });
      res.status(200).json("it has been updated");
    } else {
      res.status(403).json("you can only update your post");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//delete post
router.delete("/:id", authMiddle, async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (post.createdBy === req.body.user.id) {
      await Blog.delete();
      res.status(200).json("the post is deleted");
    } else {
      res.status(403).json("you can only delete your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//get All posts of a user
router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await Blog.find({ createdBy: req.params.userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get one post
router.get("/:id", async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
module.exports = router;
