const router = require('express').Router();
const { Blog } = require('../../models/');

router.post('/', async (req, res) => {
    try {
      const newBlog = await Blog.create({
        ...req.body,
      });
  
      res.status(200).json(newBlog);
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;