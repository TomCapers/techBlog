const router = require('express').Router();
const { Blog, User, Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

router.delete('blog/:id', withAuth, async (req, res) => {
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



module.exports = router;
