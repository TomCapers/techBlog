const router = require('express').Router();

const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
       
        const blogData = await Blog.findAll({
          include: [
            {
              model: User,
              attributes: ['user_name'],
            },
          ],
        });
            
            // JOIN with User, using the Favorite through table
            // include: [{ model: User, through: Comment, as: 'user_data'}],
        
        // Serialize data so the template can read it
        const blogs = blogData.map((blog) => blog.get({plain: true}));
        // Pass serialized data and session flag into template
         res.render('homepage', {
             blogs,
             logged_in: req.session.logged_in
         });
        console.log(blogs);
        // res.status(200).json(blogs);
    }catch (err){
        res.status(500).json(err);
    }
});

router.get('/blog/:id', async (req, res) => {
    try {
        
        const blogData = await Blog.findByPk(req.params.id, {
                include: [
                          { model: Comment, 
                            attributes: ['comment', 'blog_id', 'user_id'],
                          },
                          {
                            model: User,
                            attributes: ['user_name']
                          },
                        ],
            });

        const blogs = blogData.get({ plain: true });
            console.log(blogs);
        res.render('comment', {
          ...blogs,
          logged_in: req.session.logged_in
        });
        // res.status(200).json(blogs);
      } catch (err) {
        res.status(500).json(err);
      }
});


// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find blog and comments
    const blogData = await Blog.findAll({where: {user_id: req.session.user_id}}, {
      include: [{ model: User, 
                  attributes: ['user_name', 'user_id'],
      }],
    });

    const blogs = blogData.map((blog) => blog.get({plain: true}));
    console.log(blogs);
    res.render('dashboard', {
      test: "Hello",
      blogs: blogs,

      logged_in: true
    });
    // res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard/:id', async (req, res) => {
  try {
      
      const blogData = await Blog.findByPk(req.params.id, {
              include: [
                        { model: Comment, 
                          attributes: ['comment', 'blog_id', 'user_id'],
                        },
                        {
                          model: User,
                          attributes: ['user_name']
                        },
                      ],
          });

      const blogs = blogData.get({ plain: true });
          console.log(blogs);
      res.render('update', {
        ...blogs,
        logged_in: req.session.logged_in
      });
      // res.status(200).json(blogs);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.post('/new-blog', async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    console.log(newBlog)
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/blog/:id', withAuth, async (req, res) => {
  try {
      const userBlogData = await Blog.destroy({
          where: {
              id: req.params.id,
              user_id: req.session.user_id,
             
          }
      });
      if (!userBlogData) {
          res.status(404).json({message: 'No blog found with this id!'});
          return;
      }
      console.log('blog deleted')
      res.status(200).json(userBlogData);
      
  }catch (err){
      res.status(500).json(err);
  }
});

router.put('/blog/:id', async (req, res) => {
  try {
      
      const blogData = await Blog.update({where: {id: req.params.id}}, {
              title: req.body.title,
              content: req.body.content,

          });

      const blogs = blogData.get({ plain: true });
          console.log(blogs);
      // res.render('update', {
      //   blogs,
      //   logged_in: req.session.logged_in
      // });
      res.status(200).json(blogs);
    } catch (err) {
      res.status(500).json(err);
    }
});



  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/dashboard'); //do we have dashboard ??
      return;
    }
  
    res.render('login');
  });

  
  
  module.exports = router;
  