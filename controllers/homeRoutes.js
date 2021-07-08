const router = require('express').Router();

const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
       
        const blogData = await Blog.findAll()
            
            // JOIN with User, using the Favorite through table
            // include: [{ model: User, through: Comment, as: 'user_data'}],
        
        // Serialize data so the template can read it
        const blogs = blogData.map((blog) => blog.get({plain: true}));
        // Pass serialized data and session flag into template
         res.render('homepage', {
             blog_data: blogs,
             logged_in: req.session.loggedIn
         });
        console.log(blogs);
        res.status(200).json(blogs);
    }catch (err){
        res.status(500).json(err);
    }
});

router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id)
        // const blogData = await Blog.findByPk(req.params.id, {
        //         include: [{ model: User, through: Comment, as: 'user_data'}],
        //     });

        const blog = blogData.get({ plain: true });
            console.log(blog);
        // res.render('blog', {
        //   ...blog,
        // //   logged_in: req.session.logged_in
        // });
        res.status(200).json(blog);
      } catch (err) {
        res.status(500).json(err);
      }
});

router.get('/login', async (req,res) => {
    const userLogin = await User.findAll();
    console.log(userLogin);
    return res.json(userLogin);
});



// // Use withAuth middleware to prevent access to route
// router.get('/dashboard', withAuth, async (req, res) => {
//     try {
//       // Find the logged in user based on the session ID
//       const userData = await User.findByPk(req.session.user_id, {
//         attributes: { exclude: ['password'] },
//         include: [{ model: Blog, through: Favorite, as: 'blog_data' }],
//       });
  
//       const user = userData.get({ plain: true });
  
//       res.render('dashboard', {
//         ...user,
//         logged_in: true
//       });
//       //res.status(200).json(user);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

//   router.get('/login', (req, res) => {
//     // If the user is already logged in, redirect the request to another route
//     if (req.session.logged_in) {
//       res.redirect('/dashboard'); //do we have 'profile' ??
//       return;
//     }
  
//     res.render('login');
//   });

//   router.get('/new-blog', (req, res) => {
//     // If the user is already logged in, redirect the request to another route
//     if (!req.session.logged_in) {
//       res.redirect('/dashboard'); //do we have 'profile' ??
//       return;
//     }
  
//     res.render('postBlog');
//   });

//   router.post('/new-blog', async (req, res) => {
//     try {
//       const newBlog = await Blog.create({
//         ...req.body,
//       });
  
//       res.status(200).json(newBlog);
//     } catch (err) {
//       res.status(400).json(err);
//     }
//   });
  
  module.exports = router;
  